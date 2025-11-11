import type { UseCardProps } from "./use-card";

import { CardProvider } from "./card-context";
import { useCard } from "./use-card";

import { forwardRef } from "@/lib/system";
import { Ripple } from "../ripple";

export interface CardProps extends UseCardProps {}

const Card = forwardRef<"div", CardProps>((props, ref) => {
  const { children, context, Component, isPressable, disableAnimation, disableRipple, getCardProps, getRippleProps } =
    useCard({ ...props, ref });

  return (
    <Component {...getCardProps()}>
      <CardProvider value={context}>{children}</CardProvider>
      {isPressable && !disableAnimation && !disableRipple && <Ripple {...getRippleProps()} />}
    </Component>
  );
});

Card.displayName = "HeroUI.Card";

export default Card;
