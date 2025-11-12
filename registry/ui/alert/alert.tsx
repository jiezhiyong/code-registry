import type { ButtonProps } from "../button";
import type { UseAlertProps } from "./use-alert";

import { cloneElement, isValidElement } from "react";

import { Button } from "../button";

import { useAlert } from "./use-alert";

import { CloseIcon } from "@/icons/close";
import { DangerIcon } from "@/icons/danger";
import { InfoCircleIcon } from "@/icons/info-circle";
import { SuccessIcon } from "@/icons/success";
import { WarningIcon } from "@/icons/warning";
import { isEmpty } from "@/lib/base";
import { forwardRef } from "@/lib/system";

const iconMap = {
  primary: InfoCircleIcon,
  secondary: InfoCircleIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
} as const;

export type AlertColor = keyof typeof iconMap;

export interface AlertProps extends Omit<UseAlertProps, "hasContent"> {}

const Alert = forwardRef<"div", AlertProps>((props, ref) => {
  const {
    title,
    icon,
    children,
    description,
    endContent,
    startContent,
    isClosable,
    domRef,
    handleClose,
    getBaseProps,
    getMainWrapperProps,
    getDescriptionProps,
    getTitleProps,
    getCloseButtonProps,
    color,
    isVisible,
    onClose,
    getAlertIconProps,
    getIconWrapperProps,
  } = useAlert({ ...props, ref });

  if (!isVisible) return null;

  const customIcon = icon && isValidElement(icon) ? cloneElement(icon, getAlertIconProps()) : null;

  const IconComponent = iconMap[color as AlertColor] || iconMap.primary;

  return (
    <div ref={domRef} role="alert" {...getBaseProps()}>
      {startContent}
      <div {...getIconWrapperProps()}>{customIcon || <IconComponent {...getAlertIconProps()} />}</div>
      <div {...getMainWrapperProps()}>
        {!isEmpty(title) && <div {...getTitleProps()}>{title}</div>}
        {!isEmpty(description) && <div {...getDescriptionProps()}>{description}</div>}
        {children}
      </div>
      {endContent}
      {(isClosable || onClose) && (
        <Button
          isIconOnly
          aria-label="Close"
          radius="full"
          variant="light"
          onPress={handleClose}
          {...(getCloseButtonProps() as ButtonProps)}
        >
          <CloseIcon height={20} width={20} />
        </Button>
      )}
    </div>
  );
});

Alert.displayName = "HeroUI.Alert";

export default Alert;
