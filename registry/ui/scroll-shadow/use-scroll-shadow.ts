import type { UseDataScrollOverflowProps } from "@/lib/hooks/use-data-scroll-overflow";
import type { ReactRef } from "@/lib/react";
import type { HTMLHeroUIProps, PropGetter } from "@/lib/system";
import type { ScrollShadowVariantProps } from "./theme";

import { objectToDeps } from "@/lib/base";
import { useDataScrollOverflow } from "@/lib/hooks/use-data-scroll-overflow";
import { useDOMRef } from "@/lib/react";
import { mapPropsVariants } from "@/lib/system";
import { useMemo } from "react";
import { scrollShadow } from "./theme";

interface Props extends HTMLHeroUIProps<"div">, Omit<UseDataScrollOverflowProps, "domRef"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The shadow size in pixels.
   * @default 40
   */
  size?: number;
}

export type UseScrollShadowProps = Props & ScrollShadowVariantProps;

export function useScrollShadow(originalProps: UseScrollShadowProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, scrollShadow.variantKeys);

  const {
    ref,
    as,
    children,
    className,
    style,
    size = 40,
    offset = 0,
    visibility = "auto",
    isEnabled = true,
    onVisibilityChange,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  useDataScrollOverflow({
    domRef,
    offset,
    visibility,
    isEnabled,
    onVisibilityChange,
    updateDeps: [children],
    overflowCheck: originalProps.orientation ?? "vertical",
  });

  const styles = useMemo(
    () =>
      scrollShadow({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  const getBaseProps: PropGetter = (props = {}) => ({
    ref: domRef,
    className: styles,
    "data-orientation": originalProps.orientation ?? "vertical",
    style: {
      "--scroll-shadow-size": `${size}px`,
      ...style,
      ...props.style,
    },
    ...otherProps,
    ...props,
  });

  return { Component, styles, domRef, children, getBaseProps };
}

export type UseScrollShadowReturn = ReturnType<typeof useScrollShadow>;
