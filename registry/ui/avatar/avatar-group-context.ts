import type { ContextType } from "./use-avatar-group";

import { createContext } from "@/lib/react";

export const [AvatarGroupProvider, useAvatarGroupContext] = createContext<ContextType>({
  name: "AvatarGroupContext",
  strict: false,
});
