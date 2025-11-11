import type { AriaButtonProps } from "@/hooks/use-aria-button";
import type { ReactRef } from "@/lib/react";
import type { HTMLHeroUIProps, PropGetter } from "@/lib/system";
import type { SlotsToClasses } from "@/lib/theme/utils/types";
import type { RippleProps } from "@/registry/ui/ripple";
import type { PressEvent } from "@react-aria/interactions";
import type { FocusableProps, PressEvents } from "@react-types/shared";
import type { MouseEventHandler, ReactNode } from "react";
import type { CardReturnType, CardSlots, CardVariantProps } from "./theme";

import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { useCallback, useMemo } from "react";

import { card } from "./theme";

import { useAriaButton } from "@/hooks/use-aria-button";
import { chain, clsx, dataAttr, mergeProps, objectToDeps } from "@/lib/base";
import { useDOMRef } from "@/lib/react";
import { filterDOMProps } from "@/lib/react-rsc/filter-dom-props";
import { mapPropsVariants, useProviderContext } from "@/lib/system";
import { useRipple } from "@/registry/ui/ripple";

export interface Props extends Omit<HTMLHeroUIProps<"div">, "onClick"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Usually the Card parts, `CardHeader`, `CardBody` and `CardFooter`.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Whether the card should show a ripple animation on press, this prop is ignored if `disableAnimation` is true or `isPressable` is false.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * Whether the card should allow text selection on press. (only for pressable cards)
   * @default true
   */
  allowTextSelectionOnPress?: boolean;
  /**
   * The native button click event handler.
   * use `onPress` instead.
   * @deprecated
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Card classNames={{
   *    base:"base-classes",
   *    header: "dot-classes",
   *    body: "content-classes",
   *    footer: "avatar-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<CardSlots>;
}

export type UseCardProps = Props & PressEvents & FocusableProps & CardVariantProps;

export type ContextType = {
  slots: CardReturnType;
  classNames?: SlotsToClasses<CardSlots>;
  isDisabled?: CardVariantProps["isDisabled"];
  isFooterBlurred?: CardVariantProps["isFooterBlurred"];
  disableAnimation?: CardVariantProps["disableAnimation"];
  fullWidth?: CardVariantProps["fullWidth"];
};

export function useCard(originalProps: UseCardProps) {
  const globalContext = useProviderContext();

  const [props, variantProps] = mapPropsVariants(originalProps, card.variantKeys);

  const {
    ref,
    as,
    children,
    onClick,
    onPress,
    autoFocus,
    className,
    classNames,
    allowTextSelectionOnPress = true,
    ...otherProps
  } = props;

  const domRef = useDOMRef<HTMLDivElement>(ref);
  const Component = as || (originalProps.isPressable ? "button" : "div");
  const shouldFilterDOMProps = typeof Component === "string";

  const disableAnimation = originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;
  const disableRipple = originalProps.disableRipple ?? globalContext?.disableRipple ?? false;

  const baseStyles = clsx(classNames?.base, className);

  const { onClear: onClearRipple, onPress: onRipplePressHandler, ripples } = useRipple();

  const handlePress = useCallback(
    (e: PressEvent) => {
      if (disableRipple || disableAnimation) return;
      domRef.current && onRipplePressHandler(e);
    },
    [disableRipple, disableAnimation, domRef, onRipplePressHandler],
  );

  const { buttonProps, isPressed } = useAriaButton(
    {
      onPress: chain(onPress, handlePress),
      elementType: as,
      isDisabled: !originalProps.isPressable,
      onClick: onClick,
      allowTextSelectionOnPress,
      ...otherProps,
    } as unknown as AriaButtonProps<"button">,
    domRef,
  );

  const { hoverProps, isHovered } = useHover({
    isDisabled: !originalProps.isHoverable,
    ...otherProps,
  });

  const { isFocusVisible, isFocused, focusProps } = useFocusRing({
    autoFocus,
  });

  const slots = useMemo(
    () =>
      card({
        ...variantProps,
        disableAnimation,
      }),
    [objectToDeps(variantProps), disableAnimation],
  );

  const context = useMemo<ContextType>(
    () => ({
      slots,
      classNames,
      disableAnimation,
      isDisabled: originalProps.isDisabled,
      isFooterBlurred: originalProps.isFooterBlurred,
      fullWidth: originalProps.fullWidth,
    }),
    [
      slots,
      classNames,
      originalProps.isDisabled,
      originalProps.isFooterBlurred,
      disableAnimation,
      originalProps.fullWidth,
    ],
  );

  const getCardProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        ref: domRef,
        className: slots.base({ class: baseStyles }),
        tabIndex: originalProps.isPressable ? 0 : -1,
        "data-hover": dataAttr(isHovered),
        "data-pressed": dataAttr(isPressed),
        "data-focus": dataAttr(isFocused),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-disabled": dataAttr(originalProps.isDisabled),
        ...mergeProps(
          originalProps.isPressable ? { ...buttonProps, ...focusProps, role: "button" } : {},
          originalProps.isHoverable ? hoverProps : {},
          filterDOMProps(otherProps, {
            enabled: shouldFilterDOMProps,
          }),
          filterDOMProps(props),
        ),
      };
    },
    [
      domRef,
      slots,
      baseStyles,
      shouldFilterDOMProps,
      originalProps.isPressable,
      originalProps.isHoverable,
      originalProps.isDisabled,
      isHovered,
      isPressed,
      isFocusVisible,
      buttonProps,
      focusProps,
      hoverProps,
      otherProps,
    ],
  );

  const getRippleProps = useCallback<() => RippleProps>(
    () => ({ ripples, onClear: onClearRipple }),
    [ripples, onClearRipple],
  );

  return {
    context,
    domRef,
    Component,
    classNames,
    children,
    isHovered,
    isPressed,
    disableAnimation,
    isPressable: originalProps.isPressable,
    isHoverable: originalProps.isHoverable,
    disableRipple,
    handlePress,
    isFocusVisible,
    getCardProps,
    getRippleProps,
  };
}

export type UseCardReturn = ReturnType<typeof useCard>;
