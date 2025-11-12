import type { UseDrawerProps } from "./use-drawer";

import { Modal } from "../modal";

import { useDrawer } from "./use-drawer";

import { forwardRef } from "@/lib/system";

export interface DrawerProps extends UseDrawerProps {
  children: React.ReactNode;
}

const Drawer = forwardRef<"div", DrawerProps>(({ children, ...props }, ref) => {
  const { domRef, getModalProps } = useDrawer({ ...props, ref });

  return (
    <Modal ref={domRef} {...getModalProps()}>
      {children}
    </Modal>
  );
});

Drawer.displayName = "HeroUI.Drawer";

export default Drawer;
