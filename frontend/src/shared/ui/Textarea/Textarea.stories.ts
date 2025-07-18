import { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Компоненты/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Placeholder",
  },
};

export const NoBorder: Story = {
  args: {
    border: "noBorder",
    placeholder: "Placeholder",
  },
};

export const Error: Story = {
  args: {
    border: "error",
    placeholder: "Placeholder",
  },
};

export const Success: Story = {
  args: {
    border: "success",
    placeholder: "Placeholder",
  },
};

