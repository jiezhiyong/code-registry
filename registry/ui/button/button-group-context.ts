"use client";

import type { ContextType } from "./use-button-group";

import { createContext } from "@/lib/react/context";

export const [ButtonGroupProvider, useButtonGroupContext] = createContext<ContextType>({
  name: "ButtonGroupContext",
  strict: false,
});
