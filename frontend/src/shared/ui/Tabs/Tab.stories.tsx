import { Meta } from "@storybook/react";
import { Tabs } from "./Tabs";

export const tabs = [
  {
    name: "forYou",
    label: "forYou",
    href: "",

  },
  {
    name: "following",
    label: "following",
    href: "",

  },
  {
    name: "popular",
    label: "Popular",
    href: "",
  },
];

const meta: Meta<typeof Tabs> = {
  title: "Компоненты/Tabs",
  component: Tabs,
  args: {
    tabs
  },
  tags: ["autodocs"],
};

export default meta;



