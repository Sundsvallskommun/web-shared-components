import Button from '@sk-web-gui/button';
import Divider from '@sk-web-gui/divider';
import Icon from '@sk-web-gui/icon';
import { Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Meta } from '@storybook/react-vite';
import { TypingBubble } from '../src';
import { MarkdownRendered, TypingBubbleProps } from '../src/components';

export default {
  title: 'AI/Komponenter/TypingBubble',
  component: TypingBubble,
  tags: ['autodocs'],
} as Meta<TypingBubbleProps>;

export const Template = (args: TypingBubbleProps) => <TypingBubble {...args} />;

export const BubbleWithText = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <TypingBubble role="button" className="w-auto" onClick={() => setOpen(!open)}>
      {open ? (
        <>
          <Icon icon={<Brain />} size="1.6rem" className="animate-pulse" />
          Tänker
          <Icon icon={<ChevronDown />} size="1.6rem" />
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-16 w-full">
            <div className="flex gap-6 w-full items-center">
              <Icon icon={<Brain />} size="1.6rem" className="animate-pulse" />
              Tänker
            </div>
            <Button size="sm" variant="tertiary" showBackground={false} iconButton>
              <Icon icon={<ChevronUp />} />
            </Button>
          </div>
          <Divider />
          <div className="pr-12">
            <MarkdownRendered text={'- Kollar på en sak.\r\r- Kollar en annan sak'} messageId="0" hideElements />
          </div>
        </div>
      )}
    </TypingBubble>
  );
};
