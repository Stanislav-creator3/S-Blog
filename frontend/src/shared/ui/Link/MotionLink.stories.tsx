import { Meta, StoryObj } from "@storybook/react";
import MotionLink from "./MotionLink";
import { Avatar } from "../Avatar/Avatar";
import { formatDate } from "@/shared/utils/format-date";

const meta: Meta<typeof MotionLink> = {
  title: "Компоненты/MotionLink",
  component: MotionLink,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MotionLink>;

export const Default: Story = {
  render: () => (
    <MotionLink href="#">
      <Avatar username={"John Doe"} />
      <div className="flex flex-col justify-center">
        <p className="text-2xl font-bold py-1">{"John Doe"}</p>
        <p className="text-xs opacity-35">{formatDate(new Date())}</p>
      </div>
    </MotionLink>
  ),
};
