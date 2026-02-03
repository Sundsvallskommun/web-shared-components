import React from 'react';
import { Meta } from '@storybook/react';
import { SegmentedControl, SegmentedControlComponentProps } from '../src';
import { Button } from '@sk-web-gui/button';
import { Home } from 'lucide-react';

export default {
  title: 'Komponenter/Segmented-Control',
  component: SegmentedControl,
  tags: ['autodocs'],
} as Meta<typeof SegmentedControl>;

export const Template = (args: SegmentedControlComponentProps) => {
  const [selected, setSelected] = React.useState<number[]>([0]);

  return (
    <div className="flex flex-col gap-8">
      <SegmentedControl {...args} value={selected} onChange={setSelected}>
        <SegmentedControl.Item>
          <button>Segment 1</button>
        </SegmentedControl.Item>
        <SegmentedControl.Item>
          <button>Segment 2</button>
        </SegmentedControl.Item>
        <SegmentedControl.Item>
          <button>Segment 3</button>
        </SegmentedControl.Item>
        <SegmentedControl.Item>
          <Button iconButton leftIcon={<Home/>}/>
        </SegmentedControl.Item>
      </SegmentedControl>
    </div>
  );
};

Template.storyName = 'SegmentedControl';

export const Uncontrolled = () => {
  return (
    <div className="flex flex-col gap-8">
      <p>Uncontrolled med defaultValue={`{[0, 2]}`}</p>
      <SegmentedControl defaultValue={[0, 2]} multiSelect>
        <SegmentedControl.Item>
          <button>Option A</button>
        </SegmentedControl.Item>
        <SegmentedControl.Item>
          <button>Option B</button>
        </SegmentedControl.Item>
        <SegmentedControl.Item>
          <button>Option C</button>
        </SegmentedControl.Item>
      </SegmentedControl>
    </div>
  );
};



export const WithButton = () => {
  const [selected, setSelected] = React.useState<number[]>([]);

  return (
    <div className="flex flex-col gap-8">
      <p>Med Button-komponent</p>
      <SegmentedControl value={selected} onChange={setSelected}>
        <SegmentedControl.Item>
          <Button>Knapp 1</Button>
        </SegmentedControl.Item>
        <SegmentedControl.Item>
          <Button>Knapp 2</Button>
        </SegmentedControl.Item>
        <SegmentedControl.Item>
          <Button>Knapp 3</Button>
        </SegmentedControl.Item>
      </SegmentedControl>
    </div>
  );
};

WithButton.storyName = 'Med Button';

export const Disabled = () => {
  const [selected, setSelected] = React.useState<number[]>([0]);
  const [value, setValue] = React.useState<number[]>([0]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2">Hela komponenten disabled</p>
        <SegmentedControl value={selected} onChange={setSelected} disabled>
          <SegmentedControl.Item>
            <button>Segment 1</button>
          </SegmentedControl.Item>
          <SegmentedControl.Item>
            <button>Segment 2</button>
          </SegmentedControl.Item>
          <SegmentedControl.Item>
            <button>Segment 3</button>
          </SegmentedControl.Item>
        </SegmentedControl>
      </div>
      <div>
        <p className="mb-2">Enskild item disabled</p>
        <SegmentedControl value={value} onChange={setValue}>
          <SegmentedControl.Item>
            <button>Segment 1</button>
          </SegmentedControl.Item>
          <SegmentedControl.Item disabled>
            <button>Segment 2 (disabled)</button>
          </SegmentedControl.Item>
          <SegmentedControl.Item>
            <button>Segment 3</button>
          </SegmentedControl.Item>
        </SegmentedControl>
      </div>
    </div>
  );
};

export const Sizes = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2">Size: md</p>
        <SegmentedControl size="md" defaultValue={[0]}>
          <SegmentedControl.Item>
            <button>Small 1</button>
          </SegmentedControl.Item>
          <SegmentedControl.Item>
            <button>Small 2</button>
          </SegmentedControl.Item>
        </SegmentedControl>
      </div>
      <div>
        <p className="mb-2">Size: lg (default)</p>
        <SegmentedControl size="lg" defaultValue={[0]}>
          <SegmentedControl.Item>
            <button>Large 1</button>
          </SegmentedControl.Item>
          <SegmentedControl.Item>
            <button>Large 2</button>
          </SegmentedControl.Item>
        </SegmentedControl>
      </div>
    </div>
  );
};

Sizes.storyName = 'Storlekar';
