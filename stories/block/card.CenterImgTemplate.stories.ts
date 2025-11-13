import { ComCenterImgTemplate } from "@/registry/blocks/card/CenterImgTemplate";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Blocks/Card/CenterImgTemplate",
  component: ComCenterImgTemplate,
  tags: ["!autodocs", "block"],
} satisfies Meta<typeof ComCenterImgTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CenterImgTemplate: Story = {};
