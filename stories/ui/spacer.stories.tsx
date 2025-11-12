import type { SpacerProps } from "@/registry/ui";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { spacer, Spacer } from "@/registry/ui";

const meta = {
  title: "Components/Spacer",
  component: Spacer,
  argTypes: {
    x: {
      control: {
        type: "number",
      },
    },
    y: {
      control: {
        type: "number",
      },
    },
    isInline: {
      control: {
        type: "boolean",
      },
    },
  },
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  ...spacer.defaultVariants,
};

const content = <div className="flex flex-col w-[300px] h-[100px] bg-primary rounded-xl shadow-lg" />;

const VerticalTemplate = (args: SpacerProps) => (
  <div className="flex flex-col">
    {content}
    <Spacer {...args} />
    {content}
    <Spacer {...args} />
    {content}
  </div>
);

const HorizontalTemplate = (args: SpacerProps) => (
  <div className="flex flex-row">
    {content}
    <Spacer {...args} />
    {content}
    <Spacer {...args} />
    {content}
  </div>
);

export const Vertical: Story = {
  render: VerticalTemplate,

  args: {
    ...defaultProps,
    y: 1,
  },
};

export const Horizontal: Story = {
  render: HorizontalTemplate,

  args: {
    ...defaultProps,
    x: 1,
    isInline: true,
  },
};
