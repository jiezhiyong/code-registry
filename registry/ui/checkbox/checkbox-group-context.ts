import type { ContextType } from "./use-checkbox-group";

import { createContext } from "@/lib/react/context";

export const [CheckboxGroupProvider, useCheckboxGroupContext] = createContext<ContextType>({
  name: "CheckboxGroupContext",
  strict: false,
});
