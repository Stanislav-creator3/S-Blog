import { Meta, StoryObj } from "@storybook/react";
import { LoadingCircleSpinner } from "./LoadingCircleSpinner";

const meta: Meta<typeof LoadingCircleSpinner> = {
  title: "Компоненты/LoadingCircleSpinner",
  component: LoadingCircleSpinner,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LoadingCircleSpinner>;

export const Default: Story = {
  args: {},
};
