import type { HTMLHeroUIProps } from "@/lib/system";

import { clsx } from "@/lib/base";
import { useDOMRef } from "@/lib/react";
import { forwardRef } from "@/lib/system";

import { useCardContext } from "./card-context";

const CardBody = forwardRef<"div", HTMLHeroUIProps<"div">>((props, ref) => {
  const { as, className, children, ...otherProps } = props;

  const Component = as || "div";
  const domRef = useDOMRef(ref);

  const { slots, classNames } = useCardContext();

  const bodyStyles = clsx(classNames?.body, className);

  return (
    <Component ref={domRef} className={slots.body?.({ class: bodyStyles })} {...otherProps}>
      {children}
    </Component>
  );
});

CardBody.displayName = "HeroUI.CardBody";

export default CardBody;
