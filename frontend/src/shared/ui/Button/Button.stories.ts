import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Компоненты/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};


export const Disabled: Story = {
    args: {
      children: "Button",
      disabled: true,
    },
  };

export const Secondary: Story = {
  args: {
    children: "Button",
    intent: "secondary",
  },
};

export const Ghost: Story = {
    args: {
      children: "Button",
      intent: "ghost",
    },
  };
  
