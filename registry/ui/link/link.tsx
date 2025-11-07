import type { UseLinkProps } from "./use-link";

import { LinkIcon } from "@/lib/icons";
import { forwardRef } from "@/lib/system";
import { linkAnchorClasses } from "@/lib/theme";

import { useLink } from "./use-link";

export interface LinkProps extends UseLinkProps {}

const Link = forwardRef<"a", LinkProps>((props, ref) => {
  const {
    Component,
    children,
    showAnchorIcon,
    anchorIcon = <LinkIcon className={linkAnchorClasses} />,
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
