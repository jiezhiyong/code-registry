import type { ContextType } from "./use-button-group";

import { createContext } from "@/lib/react";

export const [ButtonGroupProvider, useButtonGroupContext] = createContext<ContextType>({
  name: "ButtonGroupContext",
  strict: false,
});
