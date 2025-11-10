import type { ContextType } from "./use-radio-group";

import { createContext } from "@/lib/react/context";

export const [RadioGroupProvider, useRadioGroupContext] = createContext<ContextType>({
  name: "RadioGroupContext",
  strict: false,
});
