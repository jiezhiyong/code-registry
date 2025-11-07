import { dataAttr } from "@/lib/assertion";
import { useDOMRef } from "@/lib/dom";
import { forwardRef } from "@/lib/forwardRef";
import { HTMLHeroUIProps } from "@/types/Rsc";
import clsx from "clsx";
import { useNavbarContext } from "./navbar-context";

export interface NavbarMenuItemProps extends HTMLHeroUIProps<"li"> {
  /**
   * Whether the item is active or not.
   * @default false
   */
  isActive?: boolean;
  children?: React.ReactNode;
}

const NavbarMenuItem = forwardRef<"li", NavbarMenuItemProps>((props, ref) => {
  const { className, children, isActive, ...otherProps } = props;

  const domRef = useDOMRef(ref);

  const { slots, isMenuOpen, classNames } = useNavbarContext();

  const styles = clsx(classNames?.menuItem, className);

  return (
    <li
      ref={domRef}
      className={slots.menuItem?.({ class: styles })}
      data-active={dataAttr(isActive)}
      data-open={dataAttr(isMenuOpen)}
      {...otherProps}
    >
      {children}
    </li>
  );
});

NavbarMenuItem.displayName = "HeroUI.NavbarMenuItem";

export default NavbarMenuItem;
