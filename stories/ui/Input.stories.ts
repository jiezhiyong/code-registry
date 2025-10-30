import { Input } from "@/registry/new-york/ui/input";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "component/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    placeholder: "Input Text ...",
  },
};

export const Password: Story = {
  args: {
    placeholder: "Input Password ...",
    type: "password",
  },
};

export const Number: Story = {
  args: {
    placeholder: "Input Number ...",
    type: "number",
  },
};

export const Readonly: Story = {
  args: {
    placeholder: "Input Readonly ...",
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Input Disabled ...",
    disabled: true,
  },
};
