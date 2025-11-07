import type { ReactRef } from "@/lib/react";
import type { HTMLHeroUIProps, PropGetter } from "@/lib/system-rsc";
import type { CodeVariantProps } from "./theme";

import { objectToDeps } from "@/lib/base";
import { mapPropsVariants } from "@/lib/system-rsc";
import { useMemo } from "react";
import { code } from "./theme";

export interface UseCodeProps extends HTMLHeroUIProps<"code">, CodeVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export function useCode(originalProps: UseCodeProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, code.variantKeys);

  const { as, children, className, ...otherProps } = props;

  const Component = as || "code";

  const styles = useMemo(
    () =>
      code({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  const getCodeProps: PropGetter = () => {
    return {
      className: styles,
      ...otherProps,
    };
  };

  return { Component, children, getCodeProps };
}

export type UseCodeReturn = ReturnType<typeof useCode>;
