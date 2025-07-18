import { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Компоненты/TextField",
  component: TextField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    error: "error",
    label: "label",
  },
};
