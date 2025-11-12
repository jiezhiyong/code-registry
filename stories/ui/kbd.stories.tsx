import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { kbd } from "@/registry/ui";
import { Kbd } from "@/registry/ui";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  argTypes: {
    keys: {
      control: {
        type: "select",
      },
      options: [
        "command",
        "shift",
        "ctrl",
        "option",
        "enter",
        "delete",
        "escape",
        "tab",
        "capslock",
        "up",
        "right",
        "down",
        "left",
        "pageup",
        "pagedown",
        "home",
        "end",
        "help",
        "space",
        "fn",
        "win",
        "alt",
      ],
    },
  },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  ...kbd.defaultVariants,
  keys: ["command"],
};

export const Default: Story = {
  args: {
    ...defaultProps,
    children: "K",
  },
};
