import React from 'react';
import { Meta } from '@storybook/react';
import { Callout, CalloutProps } from '../src';
import MenuBar from '@sk-web-gui/menubar';
import Button from '@sk-web-gui/button';

export default {
  title: 'Komponenter/Callout',
  component: Callout,
  tags: ['autodocs'],
} as Meta<typeof Callout>;

export const Template = (args: CalloutProps) => <Callout {...args} />;

Template.storyName = 'Callout';

export const OnButtonItem = (args: CalloutProps) => {
  return (
    <div>
      <MenuBar showBackground>
        <MenuBar.Item>
          <button>Ett menyval</button>
        </MenuBar.Item>
        <MenuBar.Item>
          <Button>
            Ett menyval2
            <Callout className="absolute top-2 right-2" {...args} color="error" />
          </Button>
        </MenuBar.Item>
        <MenuBar.Item>
          <button>
            Ett menyval3
            <Callout className="absolute top-2 right-2" {...args} />
          </button>
        </MenuBar.Item>
      </MenuBar>
    </div>
  );
};
