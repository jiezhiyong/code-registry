import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ExampleForm } from "@/registry/blocks/example-form/example-form";

const meta = {
  title: "block/Form",
  component: ExampleForm,
  tags: ["!autodocs", "block"],
} satisfies Meta<typeof ExampleForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
