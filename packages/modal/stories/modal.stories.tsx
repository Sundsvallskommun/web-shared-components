import { Button } from '@sk-web-gui/button';
import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal, ModalProps } from '../src/modal';
import { expect, fn, userEvent, within, waitFor } from '@storybook/test';

export default {
  title: 'Komponenter/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: { label: 'Title' },
} as Meta<typeof Modal>;

export const Template = ({ ...args }: ModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className="bg-black rounded-xl text-white m-10 p-10" onClick={openHandler}>
        Open Modal
      </button>

      <Modal {...args} show={isOpen} className="w-[43rem]" onClose={closeHandler}>
        <Modal.Content>
          <h1 className="text-h2">Headline</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Mattis nisl tempor dictum elementum. Risus nulla aliquam aliquet
            eget.
          </p>
        </Modal.Content>
        <Modal.Footer>
          <Button variant="primary" color="vattjom">
            Button
          </Button>
          <Button variant="secondary">Button</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

Template.storyName = 'Modal';

type Story = StoryObj<typeof Modal>;

const ModalTestWrapper = ({ onClose, ...args }: ModalProps & { onClose?: () => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div>
      <button className="bg-black rounded-xl text-white m-10 p-10" onClick={openHandler}>
        Open Modal
      </button>

      <Modal {...args} show={isOpen} className="w-[43rem]" onClose={closeHandler}>
        <Modal.Content>
          <h1 className="text-h2">Test Modal</h1>
          <p>Modal content for testing</p>
        </Modal.Content>
        <Modal.Footer>
          <Button variant="primary" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export const OpenCloseTest: Story = {
  name: 'Test: Open/Close',
  tags: ['dev-only', '!autodocs'],
  args: {
    label: 'Test Modal',
  },
  render: (args) => <ModalTestWrapper {...args} onClose={fn()} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open modal', async () => {
      const openButton = canvas.getByRole('button', { name: 'Open Modal' });
      await userEvent.click(openButton);
    });

    await step('Verify modal is open', async () => {
      await waitFor(() => {
        const modalContent = document.querySelector('[role="dialog"]');
        expect(modalContent).toBeInTheDocument();
      });
    });

    await step('Close modal with button', async () => {
      const closeButton = within(document.body).getByRole('button', { name: 'Close' });
      await userEvent.click(closeButton);
    });

    await step('Verify modal is closed', async () => {
      await waitFor(() => {
        const modalContent = document.querySelector('[role="dialog"]');
        expect(modalContent).not.toBeInTheDocument();
      });
    });
  },
};

export const EscapeCloseTest: Story = {
  name: 'Test: Close with Escape',
  tags: ['dev-only', '!autodocs'],
  args: {
    label: 'Test Modal',
  },
  render: (args) => <ModalTestWrapper {...args} onClose={fn()} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open modal', async () => {
      const openButton = canvas.getByRole('button', { name: 'Open Modal' });
      await userEvent.click(openButton);
    });

    await step('Verify modal is open', async () => {
      await waitFor(() => {
        const modalContent = document.querySelector('[role="dialog"]');
        expect(modalContent).toBeInTheDocument();
      });
    });

    await step('Press Escape to close', async () => {
      await userEvent.keyboard('{Escape}');
    });

    await step('Verify modal is closed', async () => {
      await waitFor(() => {
        const modalContent = document.querySelector('[role="dialog"]');
        expect(modalContent).not.toBeInTheDocument();
      });
    });
  },
};
