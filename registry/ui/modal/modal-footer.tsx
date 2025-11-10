import type { HTMLHeroUIProps } from "@/lib/system";

import { useModalContext } from "./modal-context";

import { clsx } from "@/lib/base";
import { useDOMRef } from "@/lib/react";
import { forwardRef } from "@/lib/system";

export interface ModalFooterProps extends HTMLHeroUIProps<"footer"> {}

const ModalFooter = forwardRef<"footer", ModalFooterProps>((props, ref) => {
  const { as, children, className, ...otherProps } = props;

  const { slots, classNames } = useModalContext();

  const domRef = useDOMRef(ref);

  const Component = as || "footer";

  return (
    <Component ref={domRef} className={slots.footer({ class: clsx(classNames?.footer, className) })} {...otherProps}>
      {children}
    </Component>
  );
});

ModalFooter.displayName = "HeroUI.ModalFooter";

export default ModalFooter;
