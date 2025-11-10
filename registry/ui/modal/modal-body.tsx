import type { HTMLHeroUIProps } from "@/lib/system";

import { useEffect } from "react";

import { useModalContext } from "./modal-context";

import { clsx } from "@/lib/base";
import { useDOMRef } from "@/lib/react";
import { forwardRef } from "@/lib/system";

export interface ModalBodyProps extends HTMLHeroUIProps<"div"> {}

const ModalBody = forwardRef<"div", ModalBodyProps>((props, ref) => {
  const { as, children, className, ...otherProps } = props;

  const { slots, classNames, bodyId, setBodyMounted } = useModalContext();

  const domRef = useDOMRef(ref);

  const Component = as || "div";

  /**
   * Notify us if this component was rendered or used,
   * so we can append `aria-labelledby` automatically
   */
  useEffect(() => {
    setBodyMounted(true);

    return () => setBodyMounted(false);
  }, [setBodyMounted]);

  return (
    <Component
      ref={domRef}
      className={slots.body({ class: clsx(classNames?.body, className) })}
      id={bodyId}
      {...otherProps}
    >
      {children}
    </Component>
  );
});

ModalBody.displayName = "HeroUI.ModalBody";

export default ModalBody;
