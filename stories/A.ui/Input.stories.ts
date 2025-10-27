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

export const Primary: Story = {
  args: {
    placeholder: "Input ...",
  },
};
