import { themes } from "storybook/theming";
import type { Preview } from "@storybook/nextjs-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
} from "@storybook/addon-docs/blocks";
import "../app/globals.css";
import { BlockCopyCli } from "./BlockCopyCli";

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
];

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
      theme: themes.light,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <BlockCopyCli />
          <Controls />
        </>
      ),
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
