import type { UseCodeProps } from "./use-code";

import { useCode } from "./use-code";

import { forwardRef } from "@/lib/system-rsc";

export interface CodeProps extends UseCodeProps {}

const Code = forwardRef<"div", CodeProps>((props, ref) => {
  const { Component, children, getCodeProps } = useCode({ ...props });

  return (
    <Component ref={ref} {...getCodeProps()}>
      {children}
    </Component>
  );
});

Code.displayName = "HeroUI.Code";

export default Code;
