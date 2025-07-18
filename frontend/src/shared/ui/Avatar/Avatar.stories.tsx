import { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import { AvatarSkeleton } from "./AvatarSkeleton";

const meta: Meta<typeof Avatar> = {
  title: "Компоненты/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Image: Story = {
  args: {
    username: "John Doe",
    src: "/avatar.jpeg",
  },
};

export const UserName: Story = {
  args: {
    username: "John Doe",
  },
};

export const Skeleton: Story = {
  render: () => <AvatarSkeleton size={4} />,
};
