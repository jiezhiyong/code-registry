import type { ReactRef } from "@/lib/react";
import type { HTMLHeroUIProps, PropGetter } from "@/lib/system-rsc";
import type { SpacerVariantProps } from "./theme";
import type { Space } from "./utils";

import { clsx, dataAttr, objectToDeps } from "@/lib/base";
import { mapPropsVariants } from "@/lib/system-rsc";
import { useMemo } from "react";
import { spacer } from "./theme";

import { spacing } from "./utils";

interface Props extends HTMLHeroUIProps<"span"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The x-axis margin.
   * @default 1
   *
   * @see https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
   */
  x?: Space;
  /**
   * The y-axis margin.
   * @default 1
   *
   * @see https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
   */
  y?: Space;
}

export type UseSpacerProps = Props & SpacerVariantProps;

export const getMargin = (value: Space) => {
  return spacing[value] ?? value;
};

export function useSpacer(originalProps: UseSpacerProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, spacer.variantKeys);

  const { as, className, x = 1, y = 1, ...otherProps } = props;

  const Component = as || "span";

  const styles = useMemo(
    () =>
      spacer({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  const marginLeft = getMargin(x);
  const marginTop = getMargin(y);

  const getSpacerProps: PropGetter = (props = {}) => ({
    ...props,
    ...otherProps,
    "aria-hidden": dataAttr(true),
    className: clsx(styles, props.className),
    style: {
      ...props.style,
      ...otherProps.style,
      marginLeft,
      marginTop,
    },
  });

  return { Component, getSpacerProps };
}

export type UseSpacerReturn = ReturnType<typeof useSpacer>;
