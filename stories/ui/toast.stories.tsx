import type { ToastProps } from "@/registry/ui";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { useEffect, useState } from "react";

import { Toast, ToastProvider, addToast, closeAll, closeToast, toast } from "@/registry/ui";
import { Button } from "@/registry/ui/button";

const meta = {
  title: "Components/Toast",
  component: Toast,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["flat", "bordered", "solid"],
    },
    severity: {
      control: { type: "select" },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    color: {
      control: { type: "select" },
      options: ["default", "foreground", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    hideIcon: {
      control: {
        type: "boolean",
      },
    },
    shadow: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    placement: {
      control: { type: "select" },
      options: ["bottom-right", "bottom-left", "bottom-center", "top-right", "top-left", "top-center"],
    },
    maxVisibleToasts: {
      control: { type: "number" },
    },
    hideCloseButton: {
      control: {
        type: "boolean",
      },
    },
  },
  decorators: [
    (Story, { viewMode }) => {
      useEffect(() => {
        return () => {
          closeAll();
        };
      }, []);

      return (
        <div className="flex justify-start items-start">
          <Story />
          {viewMode === "story" && <ToastProvider />}
        </div>
      );
    },
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  ...toast.defaultVariants,
};

const Template = (args: ToastProps) => {
  return (
    <Button
      className="m-auto"
      onPress={() => {
        addToast({
          title: "Toast Title",
          ...args,
        });
      }}
    >
      Show toast
    </Button>
  );
};

const ShowTimeoutProgressTemplate = (args: ToastProps) => {
  return (
    <Button
      className="m-auto"
      onPress={() => {
        addToast({
          title: "Toast Title",
          description: "Toast Description",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          ...args,
        });
      }}
    >
      Show toast
    </Button>
  );
};

const WithEndContentTemplate = (args: ToastProps) => {
  return (
    <Button
      className="m-auto"
      onPress={() => {
        addToast({
          title: "Toast Title",
          description: "Toast Description",
          endContent: (
            <Button color="warning" size="sm" variant="flat">
              Upgrade
            </Button>
          ),
          color: "warning",
          ...args,
        });
      }}
    >
      Show toast
    </Button>
  );
};

const CloseToastTemplate = (args: ToastProps) => {
  const [toastKey, setToastKey] = useState<string[]>([]);

  return (
    <div className="flex flex-wrap gap-2 m-auto">
      <Button
        onPress={() => {
          const key = addToast({
            title: "New Toast",
            timeout: Infinity,
          });

          if (!key) return;
          setToastKey((prev) => [...prev, key]);
        }}
      >
        Add Toast
      </Button>
      <Button
        color="warning"
        onPress={() => {
          if (toastKey.length == 0) return;
          closeToast(toastKey[toastKey.length - 1]);
          setToastKey((prev) => prev.slice(0, prev.length - 1));
        }}
      >
        Close The Last Toast
      </Button>
      <Button
        color="danger"
        onPress={() => {
          closeAll();
          setToastKey([]);
        }}
      >
        Close All Toasts
      </Button>
    </div>
  );
};

const PromiseToastTemplate = (args: ToastProps) => {
  return (
    <Button
      onPress={() => {
        addToast({
          title: "Toast Title",
          description: "Toast Displayed Successfully",
          promise: new Promise((resolve) => setTimeout(resolve, 3000)),
          timeout: 3000,
          shouldShowTimeoutProgress: false,
          ...args,
        });
      }}
    >
      Show toast
    </Button>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    ...defaultProps,
  },
};

export const WithDescription: Story = {
  render: Template,
  args: {
    description: "Toast displayed successfully.",
    ...defaultProps,
  },
};

export const WithEndContent: Story = {
  render: WithEndContentTemplate,
  args: {
    ...defaultProps,
  },
};

export const PromiseToast: Story = {
  render: PromiseToastTemplate,
  args: {
    ...defaultProps,
  },
};

export const ShowTimeoutProgress: Story = {
  render: ShowTimeoutProgressTemplate,
  args: {
    ...defaultProps,
  },
};

export const CloseToast: Story = {
  render: CloseToastTemplate,
  args: {
    ...defaultProps,
  },
};
