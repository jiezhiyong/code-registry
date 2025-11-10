import type { UseDrawerProps } from "./use-drawer";

import { useDrawer } from "./use-drawer";

import { forwardRef } from "@/lib/system";
import { Modal } from "@/registry/ui/modal";

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
