import React from 'react';
import { Meta } from '@storybook/react';
import { Callout, CalloutProps } from '../src';
import NavigationBar from '@sk-web-gui/navigationbar';
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
      <NavigationBar showBackground>
        <NavigationBar.Item>
          <button>Ett menyval</button>
        </NavigationBar.Item>
        <NavigationBar.Item>
          <Button>
            Ett menyval2
            <Callout className="absolute top-2 right-2" {...args} color="error" />
          </Button>
        </NavigationBar.Item>
        <NavigationBar.Item>
          <button>
            Ett menyval3
            <Callout className="absolute top-2 right-2" {...args} />
          </button>
        </NavigationBar.Item>
      </NavigationBar>
    </div>
  );
};
