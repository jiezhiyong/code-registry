import type { ModalBodyProps, ModalContentProps, ModalFooterProps, ModalHeaderProps } from "../modal";

import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "../modal";

import Drawer from "./drawer";

// export types
export type { DrawerProps } from "./drawer";
export type {
  ModalBodyProps as DrawerBodyProps,
  ModalContentProps as DrawerContentProps,
  ModalFooterProps as DrawerFooterProps,
  ModalHeaderProps as DrawerHeaderProps,
};

// export hooks
export { useDrawer } from "./use-drawer";

// export component
export { Drawer };

// export subcomponents
export {
  ModalBody as DrawerBody,
  ModalContent as DrawerContent,
  ModalFooter as DrawerFooter,
  ModalHeader as DrawerHeader,
};
