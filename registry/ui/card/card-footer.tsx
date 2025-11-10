import type { HTMLHeroUIProps } from "@/lib/system";

import { useCardContext } from "./card-context";

import { clsx } from "@/lib/base";
import { useDOMRef } from "@/lib/react";
import { forwardRef } from "@/lib/system";

export interface CardFooterProps extends HTMLHeroUIProps<"div"> {}

const CardFooter = forwardRef<"div", CardFooterProps>((props, ref) => {
  const { as, className, children, ...otherProps } = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  const { slots, classNames } = useCardContext();

  const footerStyles = clsx(classNames?.footer, className);

  return (
    <Component ref={domRef} className={slots.footer?.({ class: footerStyles })} {...otherProps}>
      {children}
    </Component>
  );
});

CardFooter.displayName = "HeroUI.CardFooter";

export default CardFooter;
