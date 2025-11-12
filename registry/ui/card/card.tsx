import type { UseCardProps } from "./use-card";

import { Ripple } from "../ripple";

import { CardProvider } from "./card-context";
import { useCard } from "./use-card";

import { forwardRef } from "@/lib/system";

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
