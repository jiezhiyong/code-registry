import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { snippet, Snippet } from "@/registry/ui";

const meta = {
  title: "Components/Snippet",
  component: Snippet,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["flat", "solid", "bordered", "shadow"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    disableCopy: {
      control: {
        type: "boolean",
      },
    },
    disableTooltip: {
      control: {
        type: "boolean",
      },
    },
    hideCopyButton: {
      control: {
        type: "boolean",
      },
    },
    hideSymbol: {
      control: {
        type: "boolean",
      },
    },
    symbol: {
      control: {
        type: "text",
      },
    },
  },
} satisfies Meta<typeof Snippet>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  children: "npm install @/registry/ui/react",
  symbol: "$",
  disableCopy: false,
  disableTooltip: false,
  hideCopyButton: false,
  hideSymbol: false,
  ...snippet.defaultVariants,
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const MultiLine: Story = {
  args: {
    ...defaultProps,
    children: ["npm install @/registry/ui/react", "yarn add @/registry/ui/react", "pnpm add @/registry/ui/react"],
  },
};
