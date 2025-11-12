"use client";

import type { ThemeProviderProps } from "next-themes";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import * as React from "react";

import { HeroUIProvider } from "@/lib/system";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

/**
 * 🚀 if you want to use react-router-dom:
 *
 * import type { NavigateOptions } from "react-router-dom";
 * declare module "@react-types/shared" {
 *   interface RouterConfig {
 *     routerOptions: NavigateOptions;
 *   }
 * }
 */
declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>["push"]>[1]>;
  }
}

/**
 * 🚀 if you want to use react-router-dom:
 *
 * import { useHref, useNavigate } from "react-router-dom";
 * const navigate = useNavigate();
 * <HeroUIProvider navigate={navigate} useHref={useHref}>...</HeroUIProvider>
 */
export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </HeroUIProvider>
  );
}
