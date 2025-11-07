import type { HTMLHeroUIProps } from "@/lib/system";
import type { AriaDialogProps } from "@react-aria/dialog";
import type { HTMLMotionProps } from "framer-motion";
import type { DOMAttributes, ReactNode } from "react";

import { getTransformOrigins } from "@/lib/aria";
import { TRANSITION_VARIANTS } from "@/lib/framer";
import { useDialog } from "@react-aria/dialog";
import { DismissButton } from "@react-aria/overlays";
import { LazyMotion, m } from "framer-motion";
import { useMemo, useRef } from "react";

import { usePopoverContext } from "./popover-context";

export interface PopoverContentProps extends AriaDialogProps, Omit<HTMLHeroUIProps, "children" | "role"> {
  children?: ReactNode | ((titleProps: DOMAttributes<HTMLElement>) => ReactNode);
}

const domAnimation = () => import("@/lib/dom-animation").then((res) => res.default);

const PopoverContent = (props: PopoverContentProps) => {
  const { as, children, className, ...otherProps } = props;

  const {
    Component: OverlayComponent,
    placement,
    backdrop,
    motionProps,
    disableAnimation,
    getPopoverProps,
    getDialogProps,
    getBackdropProps,
    getContentProps,
    isNonModal,
    onClose,
  } = usePopoverContext();

  const dialogRef = useRef(null);
  const { dialogProps: ariaDialogProps, titleProps } = useDialog({}, dialogRef);
  const dialogProps = getDialogProps({
    ref: dialogRef,
    ...ariaDialogProps,
    ...otherProps,
  });

  const Component = as || OverlayComponent || "div";

  const content = children && (
    <>
      {!isNonModal && <DismissButton onDismiss={onClose} />}
      {
        <Component {...dialogProps}>
          <div {...getContentProps({ className })}>
            {typeof children === "function" ? children(titleProps) : children}
          </div>
        </Component>
      }
      <DismissButton onDismiss={onClose} />
    </>
  );

  const backdropContent = useMemo(() => {
    if (backdrop === "transparent") {
      return null;
    }

    if (disableAnimation) {
      return <div {...getBackdropProps()} />;
    }

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          animate="enter"
          exit="exit"
          initial="exit"
          variants={TRANSITION_VARIANTS.fade}
          {...(getBackdropProps() as Omit<HTMLMotionProps<"div">, "ref">)}
        />
      </LazyMotion>
    );
  }, [backdrop, disableAnimation, getBackdropProps]);

  const style = placement ? getTransformOrigins(placement === "center" ? "top" : placement) : undefined;
  const contents = (
    <>
      {disableAnimation ? (
        content
      ) : (
        <LazyMotion features={domAnimation}>
          <m.div
            animate="enter"
            exit="exit"
            initial="initial"
            style={style}
            variants={TRANSITION_VARIANTS.scaleSpringOpacity}
            {...motionProps}
          >
            {content}
          </m.div>
        </LazyMotion>
      )}
    </>
  );

  return (
    <div {...getPopoverProps()}>
      {backdropContent}
      {contents}
    </div>
  );
};

PopoverContent.displayName = "HeroUI.PopoverContent";

export default PopoverContent;
