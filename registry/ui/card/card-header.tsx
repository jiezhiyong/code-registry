import type { HTMLHeroUIProps } from "@/lib/system";

import { useCardContext } from "./card-context";

import { clsx } from "@/lib/base";
import { useDOMRef } from "@/lib/react";
import { forwardRef } from "@/lib/system";

const CardHeader = forwardRef<"div", HTMLHeroUIProps<"div">>((props, ref) => {
  const { as, className, children, ...otherProps } = props;
  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const { slots, classNames } = useCardContext();

  const headerStyles = clsx(classNames?.header, className);

  return (
    <Component ref={domRef} className={slots.header?.({ class: headerStyles })} {...otherProps}>
      {children}
    </Component>
  );
});

CardHeader.displayName = "HeroUI.CardHeader";

export default CardHeader;
