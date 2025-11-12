import type { ChipProps } from "@/registry/ui";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CheckIcon } from "@/icons";
import { chip, Chip } from "@/registry/ui";
import { Avatar } from "@/registry/ui/avatar";

const meta = {
  title: "Components/Chip",
  component: Chip,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "bordered", "light", "flat", "faded", "shadow", "dot"],
    },
    color: {
      control: {
        type: "select",
      },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  ...chip.defaultVariants,
  children: "Chip",
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const StartContent: Story = {
  args: {
    ...defaultProps,
    startContent: (
      <span aria-label="celebration" className="ml-1" role="img">
        🎉
      </span>
    ),
  },
};

export const EndContent: Story = {
  args: {
    ...defaultProps,
    endContent: (
      <span aria-label="rocket" className="mr-1" role="img">
        🚀
      </span>
    ),
  },
};

export const Closeable: Story = {
  args: {
    ...defaultProps,
    // eslint-disable-next-line
    onClose: () => console.log("Close"),
  },
};

export const CustomCloseIcon: Story = {
  args: {
    ...defaultProps,
    endContent: <CheckIcon />,
    // eslint-disable-next-line
    onClose: () => console.log("Close"),
  },
};

export const WithAvatar: Story = {
  args: {
    ...defaultProps,
    variant: "flat",
    color: "secondary",
    avatar: <Avatar name="JW" src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />,
  },
};

const HiddenOverflowTemplate = (args: ChipProps) => (
  <div className="w-20 border-danger-500 border-2">
    <Chip {...args} />
  </div>
);

export const HiddenOverflow: Story = {
  render: HiddenOverflowTemplate,
  args: {
    ...defaultProps,
    children: "Hello World!",
  },
};
