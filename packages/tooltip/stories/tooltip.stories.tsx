import { Tooltip, TooltipProps } from '../src';
import { Meta } from '@storybook/react';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import React from 'react';
import { File, Lightbulb } from 'lucide-react';

export default {
  title: 'Komponenter/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} as Meta<typeof Tooltip>;

export const Template = (args: TooltipProps) => (
  <div style={{ height: '4rem' }}>
    <Tooltip {...args}>My tooltip</Tooltip>
  </div>
);

Template.storyName = 'Tooltip';

export const Example = () => {
  const initialHover = [false, false];
  const [hover, setHover] = React.useState<boolean[]>(initialHover);

  const handleHover = (index: number) => {
    const newHover = [...initialHover];
    newHover[index] = true;
    setHover(newHover);
  };

  return (
    <div className="flex flex-col gap-12 h-[20rem]">
      <div
        className="relative w-fit h-fit flex items-center"
        onMouseEnter={() => handleHover(0)}
        onMouseLeave={() => setHover(initialHover)}
      >
        <Button aria-label="Hjälp" iconButton rounded color="juniskar">
          <Icon icon={<Lightbulb />} />
        </Button>
        <Tooltip position="right" className={`${hover[0] ? '' : 'hidden'}`}>
          Hjälp
        </Tooltip>
      </div>
      <div
        className="relative w-fit h-fit flex items-center"
        onMouseEnter={() => handleHover(1)}
        onMouseLeave={() => setHover(initialHover)}
      >
        <Button aria-label="Skapa ny" iconButton rounded color="bjornstigen">
          <Icon icon={<File />} />
        </Button>
        <Tooltip position="right" className={`${hover[1] ? '' : 'hidden'}`}>
          Skapa ny
        </Tooltip>
      </div>
    </div>
  );
};
