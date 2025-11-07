import type { ContextType } from "./use-checkbox-group";

import { createContext } from "@/lib/react";

export const [CheckboxGroupProvider, useCheckboxGroupContext] = createContext<ContextType>({
  name: "CheckboxGroupContext",
  strict: false,
});
