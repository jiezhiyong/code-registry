import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ExampleComplex from "@/registry/blocks/example-complex/page";

const meta = {
  title: "block/Complex",
  component: ExampleComplex,
  tags: ["!autodocs", "block"],
} satisfies Meta<typeof ExampleComplex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
