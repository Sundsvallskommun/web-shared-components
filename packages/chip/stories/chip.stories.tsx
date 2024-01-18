import React from 'react';
import { Meta } from '@storybook/react';
import { Chip, ChipProps } from '../src';
import { FormControl, FormLabel, Input } from '@sk-web-gui/forms';
import { Button } from '@sk-web-gui/button';

export default {
  title: 'Komponenter/Chip',
  component: Chip,
  tags: ['autodocs'],
} as Meta<typeof Chip>;

export const Template = (args: ChipProps) => <Chip {...args}>Chip</Chip>;

Template.storyName = 'Chip';

export const AddAndRemove = () => {
  const [chips, setChips] = React.useState<string[]>(['Banan', 'Äpple']);
  const [text, setText] = React.useState<string>('');

  const onSubmit = (event) => {
    event.preventDefault();
    if (text && !chips.includes(text)) {
      setChips((chips) => [...chips, text]);
      setText('');
    }
  };

  const onRemove = (value: string) => {
    const newChips = [...chips].filter((chip) => chip !== value);
    setChips(newChips);
  };

  return (
    <div className="flex flex-col gap-16">
      <form onSubmit={onSubmit} className="">
        <FormControl>
          <FormLabel>Add chip</FormLabel>
          <Input.Group>
            <Input value={text} onChange={(e) => setText(e.target.value)} />
            <Input.RightAddin>
              <Button size="sm" type="submit">
                Add
              </Button>
            </Input.RightAddin>
          </Input.Group>
        </FormControl>
      </form>
      <div className="flex gap-4">
        {chips.map((chip, index) => (
          <Chip key={index} onClick={() => onRemove(chip)} rounded strong>
            {chip}
          </Chip>
        ))}
      </div>
    </div>
  );
};
AddAndRemove.storyName = 'Example - Add and remove';
