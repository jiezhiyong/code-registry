import { useDOMRef } from "@/lib/dom";
import { forwardRef } from "@/lib/forwardRef";
import { HTMLHeroUIProps } from "@/types/Rsc";
import clsx from "clsx";
import { useNavbarContext } from "./navbar-context";

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
    <Component
      ref={domRef}
      className={slots.brand?.({ class: styles })}
      {...otherProps}
    >
      {children}
    </Component>
  );
});

NavbarBrand.displayName = "HeroUI.NavbarBrand";

export default NavbarBrand;
