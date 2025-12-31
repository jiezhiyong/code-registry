import { Controls, Description, Primary, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import { themes } from "storybook/theming";
import { HeroUIProvider } from "../lib/system";
import { cn } from "../lib/theme/utils/cn";
import { ToastProvider } from "../registry/ui/toast/toast-provider";
import "../styles/global.css";
import { BlockCopyCli } from "./BlockCopyCli";
import "./fix.css";
import { defaultThemeIsDark } from "./manager";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    docs: {
      theme: defaultThemeIsDark ? themes.dark : themes.normal,
      codePanel: true,
      page: () => {
        return (
          <>
            <Title />
            <Subtitle />
            <Description />
            <Primary />
            <BlockCopyCli />
            <Controls />
            <Stories includePrimary={false} />
            <ToastProvider />
          </>
        );
      },
    },

    options: {
      storySort: {
        order: ["component", "block"],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    withThemeByClassName({
      defaultTheme: defaultThemeIsDark ? "dark" : "light",
      themes: {
        light: "light",
        dark: "dark",
      },
    }),
    (Story, { parameters, globals: { locale, disableAnimation, labelPlacement } }) => {
      // @ts-ignore
      const direction = locale && new Intl.Locale(locale)?.textInfo?.direction === "rtl" ? "rtl" : undefined;
      const layout = parameters.layout || "centered";

      return (
        <HeroUIProvider
          locale={locale}
          disableAnimation={disableAnimation}
          labelPlacement={labelPlacement}
          navigate={(path) => {
            window.open(path, "_blank");
          }}
        >
          <div className={cn("p-2", { "p-4 pb-10": layout === "fullscreen" })} lang={locale} dir={direction}>
            <Story />
          </div>
        </HeroUIProvider>
      );
    },
  ],
};

const locales = [
  "ar-AE",
  "bg-BG",
  "cs-CZ",
  "da-DK",
  "de-DE",
  "el-GR",
  "en-US",
  "es-ES",
  "et-EE",
  "fi-FI",
  "fr-FR",
  "he-IL",
  "hr-HR",
  "hu-HU",
  "it-IT",
  "ja-JP",
  "ko-KR",
  "lt-LT",
  "lv-LV",
  "nb-NO",
  "nl-NL",
  "pl-PL",
  "pt-BR",
  "pt-PT",
  "ro-RO",
  "ru-RU",
  "sk-SK",
  "sl-SI",
  "sr-SP",
  "sv-SE",
  "tr-TR",
  "uk-UA",
  "zh-CN",
  "zh-TW",
];

export default preview;
