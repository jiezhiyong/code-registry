import type { CardProps } from "@/registry/ui";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { card, Card, CardBody, CardFooter, CardHeader } from "@/registry/ui";
import { Button } from "@/registry/ui/button";
import { Code } from "@/registry/ui/code";
import { Image } from "@/registry/ui/image";
import { Link } from "@/registry/ui/link";

const meta = {
  title: "Components/Card",
  component: Card,
  argTypes: {
    shadow: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg"],
    },
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    isFooterBlurred: {
      control: {
        type: "boolean",
      },
    },
    isHoverable: {
      control: {
        type: "boolean",
      },
    },
    isPressable: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    disableRipple: {
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
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps = {
  ...card.defaultVariants,
  disableRipple: false,
};

const Template = (args: CardProps) => (
  <Card {...args} className="max-w-md">
    <CardBody>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
    </CardBody>
  </Card>
);

const WithDividerTemplate = (args: CardProps) => (
  <Card {...args} className="max-w-md">
    <CardHeader className="border-b border-divider dark:border-divider-dark">
      <strong>Description</strong>
    </CardHeader>
    <CardBody className="py-8">
      <p>The Object constructor creates an object wrapper for the given value.</p>
    </CardBody>
    <CardFooter className="border-t border-divider dark:border-divider-dark">
      <p>
        When called in a non-constructor context, Object behaves identically to{" "}
        <Code color="primary">new Object()</Code>.
      </p>
    </CardFooter>
  </Card>
);

const WithFooterTemplate = (args: CardProps) => (
  <Card {...args} className="p-4 max-w-md">
    <CardHeader className="flex gap-3">
      <Image
        alt="heroui logo"
        height={34}
        radius="lg"
        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
        width={34}
      />
      <div className="flex flex-col">
        <b className="text-lg">HeroUI</b>
        <p className="text-default-500">heroui.com</p>
      </div>
    </CardHeader>
    <CardBody className="py-2">
      <p>Make beautiful websites regardless of your design experience.</p>
    </CardBody>
    <CardFooter>
      <Link isExternal showAnchorIcon href="https://github.com/heroui-inc/heroui">
        Visit source code on GitHub.
      </Link>
    </CardFooter>
  </Card>
);

const WithAbsImageHeaderTemplate = (args: CardProps) => (
  <Card {...args} className="max-w-[330px]">
    <CardHeader className="absolute top-2 z-20">
      <div className="flex flex-col">
        <p className="text-white/60 text-xs uppercase font-bold">What to watch</p>
        <p className="text-white text-2xl">Stream the Apple event</p>
      </div>
    </CardHeader>
    <Image
      alt="Card background"
      className="w-full h-[440px] object-cover"
      height={440}
      src={"/images/apple-event.jpeg"}
      width={330}
    />
  </Card>
);

const WithAbsImgHeaderFooterTemplate = (args: CardProps) => (
  <Card className="w-[330px] bg-zinc-100 dark:bg-zinc-100" {...args}>
    <CardHeader className="absolute top-2 z-10">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-black/40 uppercase font-bold">New</p>
        <h4 className="text-3xl font-medium text-black">HomePod mini</h4>
        <p className="text-sm text-black/80 pr-1.5">
          Room-filling sound, Intelligent assistant. Smart home control. Works seamlessly with iPhone. Check it out
        </p>
      </div>
    </CardHeader>
    <Image
      alt="Card background"
      className="w-full h-[440px] pt-10 object-contain"
      height={440}
      src={"/images/homepod.jpeg"}
      width={300}
    />
    <CardFooter className="justify-between absolute bottom-0 z-10">
      <div>
        <p className="text-xs text-black/80">Available soon.</p>
        <p className="text-xs text-black/80">Get notified.</p>
      </div>
      <Button className="text-tiny" color="primary" radius="full" size="sm">
        Notify Me
      </Button>
    </CardFooter>
  </Card>
);

const CoverImgTemplate = (args: CardProps) => (
  <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
    <Card {...args} className="col-span-12 sm:col-span-4">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-xs text-white/60 uppercase font-bold">What to watch</p>
        <h4 className="text-white font-medium text-lg">Stream the Acme event</h4>
      </CardHeader>
      <img
        alt="Card background"
        className="w-full h-full object-cover"
        src="https://heroui.com/images/card-example-4.jpeg"
      />
    </Card>
    <Card {...args} className="col-span-12 sm:col-span-4">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-xs text-white/60 uppercase font-bold">Plant a tree</p>
        <h4 className="text-white font-medium text-lg">Contribute to the planet</h4>
      </CardHeader>
      <img
        alt="Card background"
        className="w-full h-full object-cover"
        src="https://heroui.com/images/card-example-3.jpeg"
      />
    </Card>
    <Card {...args} className="col-span-12 sm:col-span-4">
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-xs text-white/60 uppercase font-bold">Supercharged</p>
        <h4 className="text-white font-medium text-lg">Creates beauty like a beast</h4>
      </CardHeader>
      <img
        alt="Card background"
        className="w-full h-full object-cover"
        src="https://heroui.com/images/card-example-2.jpeg"
      />
    </Card>
    <Card {...args} isFooterBlurred className="w-full h-[400px] col-span-12 sm:col-span-5">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-xs text-white/60 uppercase font-bold">New</p>
        <h4 className="text-black font-medium text-2xl">Acme camera</h4>
      </CardHeader>
      <img
        alt="Card example background"
        className="w-full h-full scale-125 -translate-y-10 object-cover"
        src="https://heroui.com/images/card-example-6.jpeg"
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t border-slate-300 z-10 justify-between">
        <div>
          <p className="text-black text-xs">Available soon.</p>
          <p className="text-black text-xs">Get notified.</p>
        </div>
        <Button color="secondary" radius="full" size="sm" variant="flat">
          Notify Me
        </Button>
      </CardFooter>
    </Card>
    <Card {...args} isFooterBlurred className="w-full h-[400px] col-span-12 sm:col-span-7">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-xs text-white/60 uppercase font-bold">Your day your way</p>
        <h4 className="text-white/90 font-medium text-2xl">Your checklist for better sleep</h4>
      </CardHeader>
      <img
        alt="Relaxing app background"
        className="w-full h-full object-cover"
        src="https://heroui.com/images/card-example-5.jpeg"
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <img
            alt="Breathing app icon"
            className="rounded-full w-10 h-11 bg-black"
            src={"/images/breathing-app-icon.jpeg"}
          />
          <div className="flex flex-col">
            <p className="text-xs text-white/60">Breathing App</p>
            <p className="text-xs text-white/60">Get a good night&apos;s sleep.</p>
          </div>
        </div>
        <Button radius="full">Get App</Button>
      </CardFooter>
    </Card>
  </div>
);

const PressableTemplate = (args: CardProps) => {
  // Both events should be fired when clicking on the card

  const handlePress = () => {
    alert("card pressed");
  };

  const onClick = () => {
    alert("card clicked");
  };

  return (
    <Card {...args} isPressable onClick={onClick} onPress={handlePress}>
      <CardBody>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </CardBody>
    </Card>
  );
};

export const Default: Story = {
  render: Template,

  args: {
    ...defaultProps,
  },
};

export const Pressable: Story = {
  render: PressableTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithDivider: Story = {
  render: WithDividerTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithFooter: Story = {
  render: WithFooterTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithAbsImageHeader: Story = {
  render: WithAbsImageHeaderTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithAbsImgHeaderFooter: Story = {
  render: WithAbsImgHeaderFooterTemplate,

  args: {
    ...defaultProps,
  },
};

export const CoverImg: Story = {
  render: CoverImgTemplate,

  args: {
    ...defaultProps,
  },
};
