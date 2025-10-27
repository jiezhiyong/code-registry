import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ExampleComplex from "@/registry/new-york/blocks/example-complex";

const meta = {
  title: "block/Complex",
  component: ExampleComplex,
} satisfies Meta<typeof ExampleComplex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
