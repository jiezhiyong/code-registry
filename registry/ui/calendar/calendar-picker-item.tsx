import type { HTMLHeroUIProps } from "@/lib/system";
import type { AriaButtonProps } from "@heroui/use-aria-button";

import { filterDOMProps, useDOMRef } from "@heroui/react-utils";
import { dataAttr, mergeProps } from "@heroui/shared-utils";
import { useAriaButton } from "@heroui/use-aria-button";
import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { forwardRef } from "react";

const CalendarPickerItem = forwardRef<HTMLButtonElement, HTMLHeroUIProps<"button"> & AriaButtonProps>(
  ({ children, autoFocus, isDisabled, onKeyDown, ...otherProps }, ref) => {
    const domRef = useDOMRef(ref);

    const { buttonProps: ariaButtonProps, isPressed } = useAriaButton(
      {
        elementType: "button",
        isDisabled,
        onKeyDown,
        ...otherProps,
      } as AriaButtonProps,
      domRef
    );

    const { isFocusVisible, isFocused, focusProps } = useFocusRing({
      autoFocus,
    });

    const { isHovered, hoverProps } = useHover({ isDisabled });

    return (
      <button
        ref={domRef}
        data-disabled={dataAttr(isDisabled)}
        data-focus={dataAttr(isFocused)}
        data-focus-visible={dataAttr(isFocusVisible)}
        data-hover={dataAttr(isHovered)}
        data-pressed={dataAttr(isPressed)}
        data-slot="picker-item"
        {...mergeProps(focusProps, hoverProps, ariaButtonProps, filterDOMProps(otherProps, { enabled: true }))}
      >
        {children}
      </button>
    );
  }
);

CalendarPickerItem.displayName = "CalendarPickerItem";

export { CalendarPickerItem };
