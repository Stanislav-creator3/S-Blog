import { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";
import TagSkeleton from "./TagSkeleton";

const meta: Meta<typeof Tag> = {
  title: "Компоненты/Tag",
  component: Tag,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Primary: Story = {
  args: {
    text: "JS",
    href: "js",
  },
};

export const Skeleton: Story = {
  render: () => <TagSkeleton />,
};
