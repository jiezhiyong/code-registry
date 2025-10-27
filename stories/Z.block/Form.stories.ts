import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ExampleForm } from "@/registry/new-york/blocks/example-form";

const meta = {
  title: "block/Form",
  component: ExampleForm,
} satisfies Meta<typeof ExampleForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
