import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"],
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
  viteFinal: async (config) => {
    config.build = {
      ...config.build,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        ...config.build?.rollupOptions,
        onwarn: (warning, warn) => {
          // 忽略 "use client" 指令相关的警告
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
            return;
          }
          // 忽略 sourcemap 相关警告
          if (
            warning.message.includes("sourcemap") &&
            warning.message.includes("original location")
          ) {
            return;
          }
          // 忽略 chunk size 警告
          if (warning.message.includes("Some chunks are larger")) {
            return;
          }
          warn(warning);
        },
      },
    };
    return config;
  },
};

export default config;
