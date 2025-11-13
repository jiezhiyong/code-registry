import { ComPrimaryActionTemplate } from "@/registry/blocks/card/PrimaryActionTemplate";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Blocks/Card/PrimaryActionTemplate",
  component: ComPrimaryActionTemplate,
  tags: ["!autodocs", "block"],
} satisfies Meta<typeof ComPrimaryActionTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryActionTemplate: Story = {};
