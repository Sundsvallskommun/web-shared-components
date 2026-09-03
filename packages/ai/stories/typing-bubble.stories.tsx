import Divider from '@sk-web-gui/divider';
import Icon from '@sk-web-gui/icon';
import { Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { KeyboardEvent, useRef, useState } from 'react';
import { Meta } from '@storybook/react-vite';
import { TypingBubble } from '../src';
import { MarkdownRendered, TypingBubbleProps } from '../src/components';
import { cx } from '@sk-web-gui/utils';

export default {
  title: 'AI/Komponenter/TypingBubble',
  component: TypingBubble,
  tags: ['autodocs'],
} as Meta<TypingBubbleProps>;

export const Template = (args: TypingBubbleProps) => <TypingBubble {...args} />;

export const BubbleWithText = () => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);

  const handleClick = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === ' ' || event.key === 'Enter') {
      ref?.current?.click();
    }
  };

  return (
    <TypingBubble
      ref={ref}
      role="button"
      className="w-auto focus-visible:ring focus-visible:ring-ring focus-visible:outline-none"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      onKeyDown={handleClick}
      tabIndex={0}
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center w-full gap-16">
          <div className="flex w-full items-center gap-6">
            <Icon icon={<Brain />} size="1.6rem" className="animate-pulse" />
            Tänker
          </div>
          <span className={cx(open ? 'p-8' : 'p-0', 'flex justify-center items-center')}>
            <Icon size="1.6rem" icon={open ? <ChevronUp /> : <ChevronDown />} />
          </span>
        </div>
        {open ? (
          <>
            <Divider />
            <div className="pr-12">
              <MarkdownRendered text={'- Kollar på en sak.\r\r- Kollar en annan sak'} messageId="0" hideElements />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </TypingBubble>
  );
};
