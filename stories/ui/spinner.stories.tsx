import type { SpinnerProps } from "@/registry/ui";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { spinner } from "@/registry/ui";
import { Spinner } from "@/registry/ui";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    labelColor: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["default", "simple", "gradient", "spinner", "wave", "dots"],
    },
  },
  decorators: [
    (Story) => (
      <div className="ml-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  ...spinner.defaultVariants,
};

const VariantsTemplate = (args: SpinnerProps) => {
  return (
    <div className="flex flex-wrap items-end gap-8 py-4">
      <Spinner {...args} label="default" variant="default" />
      <Spinner {...args} label="simple" variant="simple" />
      <Spinner {...args} label="gradient" variant="gradient" />
      <Spinner {...args} label="spinner" variant="spinner" />
      <Spinner {...args} label="wave" variant="wave" />
      <Spinner {...args} label="dots" variant="dots" />
    </div>
  );
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const WithLabel: Story = {
  args: {
    ...defaultProps,
    label: "Loading...",
  },
};

export const Variants: Story = {
  args: {
    ...defaultProps,
    classNames: {
      label: "text-primary-400 mt-4",
    },
  },

  render: VariantsTemplate,
};
