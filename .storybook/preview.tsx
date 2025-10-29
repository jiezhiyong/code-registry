import { themes } from "storybook/theming";
import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/addon-docs/blocks";
import { BlockCopyCli } from "./BlockCopyCli";
import "../styles/globals.css";
import "../styles/fix.css";
import { defaultThemeIsDark } from "./manager";

const preview: Preview = {
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
          </>
        );
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
  ],
};

export default preview;
