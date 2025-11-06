import type { UseNavbarProps } from "./use-navbar";

import { LazyMotion, m } from "framer-motion";

import { forwardRef } from "@/lib/forwardRef";
import { pickChildren } from "@/lib/rsc-children";
import { mergeProps } from "@react-aria/utils";
import { NavbarProvider } from "./navbar-context";
import NavbarMenu from "./navbar-menu";
import { hideOnScrollVariants } from "./navbar-transitions";
import { useNavbar } from "./use-navbar";

export interface NavbarProps extends Omit<UseNavbarProps, "hideOnScroll"> {
  children?: React.ReactNode | React.ReactNode[];
}

const domAnimation = () =>
  import("@/lib/domAnimation").then((res) => res.default);

const Navbar = forwardRef<"div", NavbarProps>((props, ref) => {
  const { children, ...otherProps } = props;

  const context = useNavbar({ ...otherProps, ref });

  const Component = context.Component;

  const [childrenWithoutMenu, menu] = pickChildren(children, NavbarMenu);

  const content = (
    <>
      <header {...context.getWrapperProps()}>{childrenWithoutMenu}</header>
      {menu}
    </>
  );

  return (
    <NavbarProvider value={context}>
      {context.shouldHideOnScroll ? (
        <LazyMotion features={domAnimation}>
          <m.nav
            animate={context.isHidden ? "hidden" : "visible"}
            initial={false}
            variants={hideOnScrollVariants}
            {...mergeProps(context.getBaseProps(), context.motionProps)}
          >
            {content}
          </m.nav>
        </LazyMotion>
      ) : (
        <Component {...context.getBaseProps()}>{content}</Component>
      )}
    </NavbarProvider>
  );
});

Navbar.displayName = "HeroUI.Navbar";

export default Navbar;
