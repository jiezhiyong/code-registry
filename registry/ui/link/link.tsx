import type { UseLinkProps } from "./use-link";

import { linkAnchorClasses } from "./theme";
import { useLink } from "./use-link";

import { forwardRef } from "@/lib/system";
import { LinkIcon } from "@/lib/icons/link";

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
