import type { AvatarGroupProps } from "@/registry/ui";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Avatar, AvatarGroup } from "@/registry/ui";

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    radius: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    spacing: {
      control: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: AvatarGroupProps) => (
  <AvatarGroup {...args}>
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026705d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026706d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026707d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026709d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4f29026709d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026710d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026711d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026712d" />
    <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026713d" />
  </AvatarGroup>
);

const CustomSlotsTemplate = (args: AvatarGroupProps) => (
  <AvatarGroup {...args}>
    <Avatar
      classNames={{ base: "border-2 border-yellow-400" }}
      radius="sm"
      size="sm"
      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
    />
    <Avatar
      classNames={{ base: "border-2 border-yellow-500" }}
      radius="sm"
      size="sm"
      src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
    />
    <Avatar
      classNames={{ base: "border-2 border-yellow-600" }}
      radius="sm"
      size="sm"
      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
    />
    <Avatar
      classNames={{ base: "border-2 border-yellow-700" }}
      radius="sm"
      size="sm"
      src="https://i.pravatar.cc/150?u=a04258114e29026302d"
    />
    <Avatar
      classNames={{ base: "border-2 border-yellow-500" }}
      radius="sm"
      size="sm"
      src="https://i.pravatar.cc/150?u=a04258114e29026702d"
    />
    <Avatar
      classNames={{ base: "border-2 border-yellow-500" }}
      radius="sm"
      size="sm"
      src="https://i.pravatar.cc/150?u=a04258114e29026708c"
    />
  </AvatarGroup>
);

export const Default: Story = {
  render: Template,

  args: {
    color: "primary",
    isBordered: true,
  },
};

export const Grid: Story = {
  render: Template,

  args: {
    color: "primary",
    isBordered: true,
    max: 7,
    isGrid: true,
  },
};

export const isDisabled: Story = {
  render: Template,

  args: {
    color: "warning",
    isBordered: true,
    isDisabled: true,
  },
};

export const WithMaxCount: Story = {
  render: Template,

  args: {
    color: "primary",
    isBordered: true,
    max: 3,
  },
};

export const WithTotal: Story = {
  render: Template,

  args: {
    color: "primary",
    isBordered: true,
    max: 3,
    total: 10,
  },
};

export const CustomCount: Story = {
  render: Template,

  args: {
    color: "primary",
    isBordered: true,
    max: 3,
    total: 10,
    renderCount: (count: number) => <p className="text-sm text-black dark:text-white ms-2">+{count}</p>,
  },
};

export const CustomSlots: Story = {
  render: CustomSlotsTemplate,

  args: {
    classNames: { count: "border-2 border-yellow-400" },
    max: 3,
    radius: "sm",
    size: "sm",
  },
};
