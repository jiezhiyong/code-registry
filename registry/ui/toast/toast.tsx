import type { ReactElement } from "react";
import type { ButtonProps } from "../button";
import type { UseToastProps } from "./use-toast";

import { m } from "framer-motion";
import { cloneElement, isValidElement } from "react";

import { useToast } from "./use-toast";

import { CloseIcon } from "@/icons/close";
import { DangerIcon } from "@/icons/danger";
import { InfoFilledIcon } from "@/icons/info-filled";
import { SuccessIcon } from "@/icons/success";
import { WarningIcon } from "@/icons/warning";
import { forwardRef } from "@/lib/system";
import { Button } from "../button";
import { Spinner } from "../spinner";

export interface ToastProps extends UseToastProps {}

const iconMap = {
  default: InfoFilledIcon,
  primary: InfoFilledIcon,
  secondary: InfoFilledIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: DangerIcon,
} as const;

const Toast = forwardRef<"div", ToastProps>((props, ref) => {
  const {
    severity,
    Component,
    icon,
    loadingComponent,
    domRef,
    endContent,
    color,
    hideIcon,
    closeIcon,
    disableAnimation,
    progressBarRef,
    classNames,
    slots,
    getWrapperProps,
    isProgressBarVisible,
    getToastProps,
    getContentProps,
    getTitleProps,
    getDescriptionProps,
    getCloseButtonProps,
    getIconProps,
    getMotionDivProps,
    getCloseIconProps,
    getLoadingComponentProps,
    getSpinnerComponentProps,
    isLoading,
  } = useToast({
    ...props,
    ref,
  });

  const customIcon =
    typeof icon === "function"
      ? icon(getIconProps())
      : isValidElement(icon) && cloneElement(icon as ReactElement, getIconProps());

  const IconComponent = severity ? iconMap[severity] : iconMap[color] || iconMap.default;

  const customLoadingComponent =
    loadingComponent && isValidElement(loadingComponent)
      ? cloneElement(loadingComponent, getLoadingComponentProps())
      : null;

  const loadingIconComponent = isLoading ? customLoadingComponent || <Spinner {...getSpinnerComponentProps()} /> : null;

  const customCloseIcon =
    typeof closeIcon === "function"
      ? closeIcon({})
      : isValidElement(closeIcon) && cloneElement(closeIcon as ReactElement, {});

  const toastContent = (
    <Component ref={domRef} {...getToastProps()}>
      <div {...getContentProps()}>
        {hideIcon && !isLoading ? null : loadingIconComponent || customIcon || <IconComponent {...getIconProps()} />}
        <div {...getWrapperProps()}>
          <div {...getTitleProps()}>{props.toast.content.title}</div>
          <div {...getDescriptionProps()}>{props.toast.content.description}</div>
        </div>
      </div>
      {isProgressBarVisible && (
        <div className={slots.progressTrack({ class: classNames?.progressTrack })}>
          <div ref={progressBarRef} className={slots.progressIndicator({ class: classNames?.progressIndicator })} />
        </div>
      )}
      <Button isIconOnly {...(getCloseButtonProps() as ButtonProps)}>
        {customCloseIcon || <CloseIcon {...getCloseIconProps()} />}
      </Button>
      {endContent}
    </Component>
  );

  return <>{disableAnimation ? toastContent : <m.div {...getMotionDivProps()}>{toastContent}</m.div>}</>;
});

Toast.displayName = "HeroUI.Toast";

export default Toast;
