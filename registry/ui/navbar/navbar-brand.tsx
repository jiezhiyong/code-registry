import type { HTMLHeroUIProps } from "@/lib/system";

import { useNavbarContext } from "./navbar-context";

import { clsx } from "@/lib/base";
import { useDOMRef } from "@/lib/react";
import { forwardRef } from "@/lib/system";

export interface NavbarBrandProps extends HTMLHeroUIProps<"div"> {
  children?: React.ReactNode | React.ReactNode[];
}

const NavbarBrand = forwardRef<"div", NavbarBrandProps>((props, ref) => {
  const { as, className, children, ...otherProps } = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  const { slots, classNames } = useNavbarContext();

  const styles = clsx(classNames?.brand, className);

  return (
    <Component ref={domRef} className={slots.brand?.({ class: styles })} {...otherProps}>
      {children}
    </Component>
  );
});

NavbarBrand.displayName = "HeroUI.NavbarBrand";

export default NavbarBrand;
