import type { HTMLMotionProps } from "framer-motion";

import { Overlay } from "@react-aria/overlays";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import React from "react";

import { dataAttr } from "@/lib/assertion";
import { useDOMRef } from "@/lib/dom";
import { forwardRef } from "@/lib/forwardRef";
import { HTMLHeroUIProps } from "@/types/Rsc";
import { mergeProps } from "@react-aria/utils";
import clsx from "clsx";
import { useNavbarContext } from "./navbar-context";
import { menuVariants } from "./navbar-menu-transitions";

export interface NavbarMenuProps extends HTMLHeroUIProps<"ul"> {
  children?: React.ReactNode;
  /**
   * The container element in which the navbar menu overlay portal will be placed.
   * @default document.body
   */
  portalContainer?: Element;
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: Omit<HTMLMotionProps<"ul">, "ref">;
}

const domAnimation = () =>
  import("@/lib/domAnimation").then((res) => res.default);

const NavbarMenu = forwardRef<"ul", NavbarMenuProps>((props, ref) => {
  const {
    className,
    children,
    portalContainer,
    motionProps,
    style,
    ...otherProps
  } = props;
  const domRef = useDOMRef(ref);

  const { slots, isMenuOpen, height, disableAnimation, classNames } =
    useNavbarContext();

  const styles = clsx(classNames?.menu, className);

  if (disableAnimation) {
    if (!isMenuOpen) return null;

    return (
      <Overlay portalContainer={portalContainer}>
        <ul
          ref={domRef}
          className={slots.menu?.({ class: styles })}
          data-open={dataAttr(isMenuOpen)}
          style={{
            "--navbar-height":
              typeof height === "number" ? `${height}px` : height,
          }}
          {...otherProps}
        >
          {children}
        </ul>
      </Overlay>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isMenuOpen ? (
        <Overlay portalContainer={portalContainer}>
          <LazyMotion features={domAnimation}>
            <m.ul
              ref={domRef}
              layoutScroll
              animate="enter"
              className={slots.menu?.({ class: styles })}
              data-open={dataAttr(isMenuOpen)}
              exit="exit"
              initial="exit"
              style={{
                "--navbar-height":
                  typeof height === "number" ? `${height}px` : height,
                ...style,
              }}
              variants={menuVariants}
              {...mergeProps(motionProps, otherProps)}
            >
              {children}
            </m.ul>
          </LazyMotion>
        </Overlay>
      ) : null}
    </AnimatePresence>
  );
});

NavbarMenu.displayName = "HeroUI.NavbarMenu";

export default NavbarMenu;
