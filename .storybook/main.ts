import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  tags: {
    block: {},
  },
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-themes',
    {
      name: '@storybook/addon-mcp',
      options: {
        toolsets: {
          dev: true, // Tools for story URL retrieval and UI building instructions (default: true)
          docs: true, // Tools for component manifest and documentation (default: true, requires experimental feature flag below 👇)
        },
        experimentalFormat: 'markdown', // Output format: 'markdown' (default) or 'xml'
      },
    },
  ],
  features: {
    experimentalComponentsManifest: true, // Enable manifest generation for the docs toolset, only supported in React-based setups.
  },
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
  viteFinal: async (config) => {
    config.build = {
      ...config.build,
      chunkSizeWarningLimit: 3000,
      rollupOptions: {
        ...config.build?.rollupOptions,
        onwarn: (warning, warn) => {
          // 忽略 "use client" 指令相关的警告
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return;
          }
          // 忽略 sourcemap 相关警告
          if (
            warning.message.includes('sourcemap') &&
            warning.message.includes('original location')
          ) {
            return;
          }
          // 忽略 chunk size 警告
          if (warning.message.includes('Some chunks are larger')) {
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
