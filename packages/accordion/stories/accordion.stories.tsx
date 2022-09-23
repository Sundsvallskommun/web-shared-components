import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { Accordion, AccordionProps } from '../src';

export default {
  title: 'Komponenter/Accordions/Komponent',
  component: Accordion,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} as Meta;

export const Template = (args: AccordionProps) => {
  const [content, setContent] = useState(false);

  return (
    <>
      <Accordion {...args}>
        <h4>Lorem Ipsum</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero placeat eveniet quas nulla saepe minus
          recusandae quis obcaecati necessitatibus. Quidem.
        </p>
        <button
          onClick={() => {
            setContent(!content);
          }}
        >
          Växla
        </button>
        {content && (
          <>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam pariatur perspiciatis molestiae
              itaque, nulla illo quam, provident ex reprehenderit veniam in consectetur debitis maiores sapiente
              consequuntur fugiat voluptatem. Fugiat!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam pariatur perspiciatis molestiae
              itaque, nulla illo quam, provident ex reprehenderit veniam in consectetur debitis maiores sapiente
              consequuntur fugiat voluptatem. Fugiat!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam pariatur perspiciatis molestiae
              itaque, nulla illo quam, provident ex reprehenderit veniam in consectetur debitis maiores sapiente
              consequuntur fugiat voluptatem. Fugiat!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam pariatur perspiciatis molestiae
              itaque, nulla illo quam, provident ex reprehenderit veniam in consectetur debitis maiores sapiente
              consequuntur fugiat voluptatem. Fugiat!
            </p>
          </>
        )}
      </Accordion>
    </>
  );
};

Template.argTypes = {
  accordionTitle: { control: 'text', defaultValue: 'En vanlig fråga' },
  accordionSubTitle: { control: 'text', defaultValue: 'En vanlig underrubrik' },
  initalOpen: { control: 'boolean', defaultValue: false },
  variant: {
    type: { name: 'string', required: false },
    description: 'Sets variant',
    table: {
      defaultValue: { summary: 'solid' },
    },
    options: ['solid', 'outline'],
    control: 'select',
    defaultValue: 'solid',
  },
  // TODO: implement disabled and color for accordions
  /* disabled: { control: 'boolean', defaultValue: false },
    color: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
      defaultValue: 'primary',
    }, */
};

Template.story = { name: 'Komponent' };
