import type { ButtonProps } from "@/registry/ui/button";
import type { AriaButtonProps } from "@react-types/button";

import { ChevronDownIcon } from "@/lib/icons/chevron-down";
import { ChevronUpIcon } from "@/lib/icons/chevron-up";
import { Button } from "@/registry/ui/button";

export interface NumberInputStepperProps extends Omit<ButtonProps, keyof AriaButtonProps> {
  direction: "up" | "down";
}

const NumberInputStepper = ({ direction, ...otherProps }: NumberInputStepperProps) => {
  return (
    <Button disableRipple isIconOnly {...otherProps}>
      {direction == "up" ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </Button>
  );
};

NumberInputStepper.displayName = "HeroUI.NumberInputStepper";

export default NumberInputStepper;
