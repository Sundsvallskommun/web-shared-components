import React from 'react';
import { Meta } from '@storybook/react';
import { Accordion, AccordionProps} from "../src";

export default {
  title: "Design System/komponenter/Accordions/Komponent",
  component: Accordion,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} as Meta;

export const Template = (args: AccordionProps) => <Accordion {...args}>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero placeat eveniet quas nulla saepe minus recusandae quis obcaecati necessitatibus. Quidem.</p>
  </Accordion>;

Template.argTypes = {
    accordionTitle: { control: 'text', defaultValue: 'En vanlig fråga' },
    initalOpen: { control: 'boolean', defaultValue: false },
    // TODO: implement disabled and color for accordions
    /* disabled: { control: 'boolean', defaultValue: false },
    color: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
      defaultValue: 'primary',
    }, */
};

Template.story = { name: 'Komponent' };
