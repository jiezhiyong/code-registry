"use client";

import type { UseLinkProps } from "./use-link";

import { forwardRef } from "@/lib/forwardRef";
import { LinkIcon } from "lucide-react";
import { useLink } from "./use-link";

export interface LinkProps extends UseLinkProps {}

const Link = forwardRef<"a", LinkProps>((props, ref) => {
  const {
    Component,
    children,
    showAnchorIcon,
    anchorIcon = <LinkIcon />,
    getLinkProps,
  } = useLink({
    ref,
    ...props,
  });

  return (
    <Component {...getLinkProps()}>
      <>
        {children}
        {showAnchorIcon && anchorIcon}
      </>
    </Component>
  );
});

Link.displayName = "HeroUI.Link";

export default Link;
