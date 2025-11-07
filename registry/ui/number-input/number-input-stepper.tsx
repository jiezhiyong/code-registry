import type { ButtonProps } from "@heroui/button";
import type { AriaButtonProps } from "@react-types/button";

import { ChevronDownIcon, ChevronUpIcon } from "@/lib/icons";
import { Button } from "@heroui/button";

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
