import type { UseTooltipProps } from "./use-tooltip";

import { getTransformOrigins } from "@/lib/aria";
import { TRANSITION_VARIANTS } from "@/lib/framer";
import { forwardRef } from "@/lib/system";
import { mergeProps, warn } from "@heroui/shared-utils";
import { OverlayContainer } from "@react-aria/overlays";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { Children, cloneElement, isValidElement } from "react";

import { useTooltip } from "./use-tooltip";

export interface TooltipProps extends Omit<UseTooltipProps, "disableTriggerFocus" | "backdrop"> {}

const domAnimation = () => import(""@/lib/dom-animation").then((res) => res.default);

const Tooltip = forwardRef<"div", TooltipProps>((props, ref) => {
  const {
    Component,
    children,
    content,
    isOpen,
    portalContainer,
    placement,
    disableAnimation,
    motionProps,
    getTriggerProps,
    getTooltipProps,
    getTooltipContentProps,
  } = useTooltip({
    ...props,
    ref,
  });

  let trigger: React.ReactElement;

  try {
    /**
     * Ensure tooltip has only one child node
     */
    const childrenNum = Children.count(children);

    if (childrenNum !== 1) throw new Error();

    if (!isValidElement(children)) {
      trigger = <p {...getTriggerProps()}>{children}</p>;
    } else {
      const child = children as React.ReactElement & {
        ref?: React.Ref<any>;
      };

      // Accessing the ref from props, else fallback to element.ref
      // https://github.com/facebook/react/pull/28348
      const childRef = child.props.ref ?? (child as any).ref;

      trigger = cloneElement(child, getTriggerProps(child.props, childRef));
    }
  } catch {
    trigger = <span />;
    warn("Tooltip must have only one child node. Please, check your code.");
  }

  const { ref: tooltipRef, id, style, ...otherTooltipProps } = getTooltipProps();

  const animatedContent = (
    <div key={`${id}-tooltip-content`} ref={tooltipRef} id={id} style={style}>
      <m.div
        key={`${id}-tooltip-inner`}
        animate="enter"
        exit="exit"
        initial="exit"
        variants={TRANSITION_VARIANTS.scaleSpring}
        {...mergeProps(motionProps, otherTooltipProps)}
        style={{
          ...getTransformOrigins(placement),
        }}
      >
        <Component {...getTooltipContentProps()}>{content}</Component>
      </m.div>
    </div>
  );

  return (
    <>
      {trigger}
      {disableAnimation ? (
        isOpen && (
          <OverlayContainer portalContainer={portalContainer}>
            <div ref={tooltipRef} id={id} style={style} {...otherTooltipProps}>
              <Component {...getTooltipContentProps()}>{content}</Component>
            </div>
          </OverlayContainer>
        )
      ) : (
        <LazyMotion features={domAnimation}>
          <AnimatePresence>
            {isOpen && <OverlayContainer portalContainer={portalContainer}>{animatedContent}</OverlayContainer>}
          </AnimatePresence>
        </LazyMotion>
      )}
    </>
  );
});

Tooltip.displayName = "HeroUI.Tooltip";

export default Tooltip;
