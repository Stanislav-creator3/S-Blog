import { Meta, StoryObj } from "@storybook/react";
import { LinkUi } from "./Link";

const meta: Meta<typeof LinkUi> = {
  title: "Компоненты/LinkUi",
  component: LinkUi,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LinkUi>;

export const Default: Story = {
  args: {
    href: "",
    children: "Link",
  },
};
