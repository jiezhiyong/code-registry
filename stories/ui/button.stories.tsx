import type { ButtonProps } from "@/registry/ui";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import React from "react";

import { Camera, HeadphonesIcon, Notification } from "@/icons";
import { button, Button } from "@/registry/ui";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "bordered", "light", "flat", "faded", "shadow", "ghost"],
    },
    color: {
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
    spinnerPlacement: {
      control: {
        type: "select",
      },
      options: ["start", "end"],
    },
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    isLoading: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  children: "Button",
  spinnerPlacement: "start" as const,
  ...button.defaultVariants,
};

const StateTemplate = (args: ButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePress = (e: any) => {
    // eslint-disable-next-line no-console
    console.log("Pressed", e);
    setIsOpen((prev) => !prev);
  };

  return (
    <Button {...args} aria-label={isOpen ? "Close" : "Open"} aria-pressed={isOpen} onPress={handlePress}>
      {isOpen ? "Close" : "Open"}
    </Button>
  );
};

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const WithState: Story = {
  render: StateTemplate,

  args: {
    ...defaultProps,
  },
};

export const IsDisabled: Story = {
  args: {
    ...defaultProps,
    isDisabled: true,
  },
};

export const DisableRipple: Story = {
  args: {
    ...defaultProps,
    disableRipple: true,
  },
};

export const WithIcons: Story = {
  args: {
    ...defaultProps,
    startContent: <Notification className="fill-current" />,
    endContent: <Camera className="fill-current" />,
  },
};

export const IconButton: Story = {
  args: {
    ...defaultProps,
    isIconOnly: true,
    children: <HeadphonesIcon className="w-5 h-5" />,
  },
};

export const IsLoading: Story = {
  args: {
    ...defaultProps,
    color: "primary",
    isLoading: true,
  },
};

export const CustomWithClassNames: Story = {
  args: {
    ...defaultProps,
    radius: "full",
    className: "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
  },
};
