"use client";

import type { NavigateOptions } from "react-router-dom";

import * as React from "react";
import { useHref, useNavigate } from "react-router-dom";

import { HeroUIProvider } from "@/lib/system";

export interface ProviderProps {
  children: React.ReactNode;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: ProviderProps) {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      {children}
    </HeroUIProvider>
  );
}
