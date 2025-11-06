import { useDOMRef } from "@/lib/dom";
import { forwardRef } from "@/lib/forwardRef";
import { HTMLHeroUIProps } from "@/types/Rsc";
import clsx from "clsx";
import { useNavbarContext } from "./navbar-context";

export interface NavbarContentProps extends HTMLHeroUIProps<"ul"> {
  /**
   * The content of the Navbar.Content. It is usually the `NavbarItem`,
   */
  children?: React.ReactNode | React.ReactNode[];
  /**
   * The justify of the content
   * @default start
   */
  justify?: "start" | "end" | "center";
}

const NavbarContent = forwardRef<"ul", NavbarContentProps>((props, ref) => {
  const { as, className, children, justify = "start", ...otherProps } = props;

  const Component = as || "ul";
  const domRef = useDOMRef(ref);

  const { slots, classNames } = useNavbarContext();

  const styles = clsx(classNames?.content, className);

  return (
    <Component
      ref={domRef}
      className={slots.content?.({ class: styles })}
      data-justify={justify}
      {...otherProps}
    >
      {children}
    </Component>
  );
});

NavbarContent.displayName = "HeroUI.NavbarContent";

export default NavbarContent;
