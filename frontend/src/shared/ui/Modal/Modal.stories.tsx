import { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";
import { useState } from "react";

const meta: Meta<typeof Modal> = {
  title: "Компоненты/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

const DefaultUsage = (args : {width: 'md' | 'full'}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Header>Modal Header</Modal.Header>
        <Modal.Body>Modal Body</Modal.Body>
        <Modal.Footer>
          <Button intent="secondary">Button</Button>
          <Button>Button</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
  
}

export const Default: Story = {
  args: {
    width: 'md'
  },
  render: (args) => { return DefaultUsage(args); }, 

};

