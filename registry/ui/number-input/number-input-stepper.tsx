import type { AriaButtonProps } from "@react-types/button";
import type { ButtonProps } from "../button";

import { Button } from "../button";

import { ChevronDownIcon } from "@/icons/chevron-down";
import { ChevronUpIcon } from "@/icons/chevron-up";

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
