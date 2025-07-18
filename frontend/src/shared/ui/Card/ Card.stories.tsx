import { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Tag } from "../Tag/Tag";

const meta: Meta<typeof Card> = {
  title: "Компоненты/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    children: <Tag text="JS" href="js" />,
  },
};
