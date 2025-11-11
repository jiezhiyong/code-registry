import type { AriaButtonProps } from "@/hooks/use-aria-button";
import type { HTMLHeroUIProps } from "@/lib/system";

import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { forwardRef } from "react";

import { useAriaButton } from "@/hooks/use-aria-button";
import { dataAttr, mergeProps } from "@/lib/base";
import { useDOMRef } from "@/lib/react";
import { filterDOMProps } from "@/lib/react-rsc/filter-dom-props";

const CalendarPickerItem = forwardRef<HTMLButtonElement, HTMLHeroUIProps<"button"> & AriaButtonProps>(
  ({ children, autoFocus, isDisabled, onKeyDown, ...otherProps }, ref) => {
    const domRef = useDOMRef(ref);

    const { buttonProps: ariaButtonProps, isPressed } = useAriaButton(
      {
        elementType: "button",
        isDisabled,
        onKeyDown,
        ...otherProps,
      } as AriaButtonProps,
      domRef,
    );

    const { isFocusVisible, isFocused, focusProps } = useFocusRing({
      autoFocus,
    });

    const { isHovered, hoverProps } = useHover({ isDisabled });

    return (
      <button
        ref={domRef}
        data-disabled={dataAttr(isDisabled)}
        data-focus={dataAttr(isFocused)}
        data-focus-visible={dataAttr(isFocusVisible)}
        data-hover={dataAttr(isHovered)}
        data-pressed={dataAttr(isPressed)}
        data-slot="picker-item"
        {...mergeProps(focusProps, hoverProps, ariaButtonProps, filterDOMProps(otherProps, { enabled: true }))}
      >
        {children}
      </button>
    );
  },
);

CalendarPickerItem.displayName = "CalendarPickerItem";

export { CalendarPickerItem };
