import type { CheckboxIconProps, CheckboxProps } from "@/registry/ui";
import type { ValidationErrors } from "@react-types/shared";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import React from "react";
import { useForm } from "react-hook-form";

import { CloseIcon } from "@/icons";
import { button, checkbox, Checkbox } from "@/registry/ui";
import { Form } from "@/registry/ui/form";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
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
    lineThrough: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    validationBehavior: {
      control: {
        type: "select",
      },
      options: ["aria", "native"],
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultProps: CheckboxProps = {
  ...checkbox.defaultVariants,
  children: "Option",
};

const ControlledTemplate = (args: CheckboxProps) => {
  const [selected, setSelected] = React.useState<boolean>(true);

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("Checkbox ", selected);
  }, [selected]);

  return (
    <div className="flex flex-col gap-2">
      <Checkbox isSelected={selected} onValueChange={setSelected} {...args}>
        Subscribe (controlled)
      </Checkbox>
      <p className="text-default-500">Selected: {selected ? "true" : "false"}</p>
      <button onClick={() => setSelected(!selected)}>Toggle</button>
    </div>
  );
};

const FormTemplate = (args: CheckboxProps) => {
  return (
    <form
      className="flex flex-col items-start gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const checkbox = e.target["check"] as HTMLInputElement;

        if (checkbox.checked) {
          alert(`Submitted value: ${checkbox.value}`);
        } else {
          alert("Checkbox is not checked");
        }
      }}
    >
      <Checkbox name="check" value="checked" {...args}>
        Check
      </Checkbox>
      <button className={button({ color: "primary" })} type="submit">
        Submit
      </button>
    </form>
  );
};

const GroupTemplate = (args: CheckboxProps) => {
  const items = ["Apple", "Banana", "Orange", "Mango"];

  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const isSelected = (value: string) => {
    return selectedItems.some((selected) => selected === value);
  };

  const handleValueChange = (value: string) => {
    setSelectedItems([value]);
  };

  return (
    <div className="text-white flex flex-col gap-2">
      <h2>List of Fruits</h2>

      {items.map((item, index) => (
        <Checkbox
          {...args}
          key={index}
          className="text-white"
          color="primary"
          isSelected={isSelected(item)}
          onValueChange={() => handleValueChange(item)}
        >
          {item} {isSelected(item) ? "/ state: true" : "/ state: false"}
        </Checkbox>
      ))}
    </div>
  );
};

const WithReactHookFormTemplate = (args: CheckboxProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data);
    alert("Submitted value: " + data.example);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Checkbox {...args} {...register("example", { required: true })} />
      {errors.example && <span className="text-danger">This field is required</span>}
      <button className={button({ class: "w-fit" })} type="submit">
        Submit
      </button>
    </form>
  );
};

const WithFormTemplate = (args: CheckboxProps) => {
  const [submitted, setSubmitted] = React.useState<{ [key: string]: FormDataEntryValue } | null>(null);
  const [errors, setErrors] = React.useState<ValidationErrors | undefined>(undefined);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const terms = data.terms;

    if (terms !== "true") {
      setErrors({ terms: "You must agree to the terms and conditions" });

      return;
    }

    // Clear errors and submit
    setErrors(undefined);
    setSubmitted(data);
  };

  return (
    <Form validationErrors={errors} onSubmit={onSubmit}>
      <Checkbox
        isRequired
        classNames={{
          label: "text-small",
        }}
        isInvalid={!!errors?.terms}
        name="terms"
        validationBehavior="aria"
        value="true"
        onValueChange={() => setErrors(undefined)}
        {...args}
      >
        I agree to the terms and conditions
      </Checkbox>
      {errors?.terms && <span className="text-danger text-small">{errors.terms}</span>}
      <button className={button({ class: "w-fit" })} type="submit">
        Submit
      </button>
      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
};

export const Default: Story = {
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

export const DefaultSelected: Story = {
  args: {
    ...defaultProps,
    defaultSelected: true,
  },
};

export const CustomIconNode: Story = {
  args: {
    ...defaultProps,
    icon: <CloseIcon />,
  },
};

export const Group: Story = {
  render: GroupTemplate,

  args: {
    ...defaultProps,
  },
};

export const WithReactHookForm: Story = {
  render: WithReactHookFormTemplate,

  args: {
    ...defaultProps,
  },
};

export const CustomIconFunction: Story = {
  args: {
    ...defaultProps,

    icon: (props: CheckboxIconProps) => <CloseIcon {...props} />,
  },
};

export const AlwaysSelected: Story = {
  args: {
    ...defaultProps,
    isSelected: true,
  },
};

export const IsIndeterminate: Story = {
  args: {
    ...defaultProps,
    isIndeterminate: true,
  },
};

export const LineThrough: Story = {
  args: {
    ...defaultProps,
    lineThrough: true,
  },
};

export const DisableAnimation: Story = {
  args: {
    ...defaultProps,
    disableAnimation: true,
  },
};

export const Controlled: Story = {
  render: ControlledTemplate,

  args: {
    ...defaultProps,
  },
};

export const Required: Story = {
  render: FormTemplate,

  args: {
    ...defaultProps,
    isRequired: true,
  },
};

export const WithForm: Story = {
  render: WithFormTemplate,

  args: {
    ...defaultProps,
  },
};
