import { Meta, StoryObj } from "@storybook/react";
import { Form } from "./Form";
import Input from "../Input/Input";

const meta: Meta<typeof Form> = {
  title: "Компоненты/Form",
  component: Form,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Form>;

const DefaultUsage = () => {
  return (
    <Form>
      <Form.Label>Label</Form.Label>
      <Input placeholder="Input" />
      <Form.Description>Description</Form.Description>
    </Form>
  );
};

export const Default: Story = {
  render: () => {
    return DefaultUsage();
  },
};
