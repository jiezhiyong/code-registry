import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { code } from "@/registry/ui";
import { Code } from "@/registry/ui";

const meta = {
  title: "Components/Code",
  component: Code,
  argTypes: {
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
  },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  children: "npm install @/registry/ui/react",
  ...code.defaultVariants,
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};
