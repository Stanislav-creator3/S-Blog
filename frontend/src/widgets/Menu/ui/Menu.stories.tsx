import { Meta, StoryObj } from "@storybook/react";
import Menu from "./Menu";

const meta: Meta<typeof Menu> = {
  title: "Компоненты/Menu",
  component: Menu,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => (
    <div>
      <Menu  />
    </div>
  ),
};
