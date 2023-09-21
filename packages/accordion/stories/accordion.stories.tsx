import { Meta } from '@storybook/react';
import { Accordion, AccordionProps } from '../src';
import React from 'react';
import { Badge } from '@sk-web-gui/badge';

export default {
  title: 'Komponenter/Accordions/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} as Meta;

export const Template = (args: AccordionProps) => {
  return (
    <>
      <div>
        <Accordion {...args}>
          <Accordion.Item
            header={
              <>
                Grej 1 <Badge color="error" size="md" counter={15} />
              </>
            }
          >
            <p>Hej hej</p>
          </Accordion.Item>
          <Accordion.Item header="Grej 2" subTitle="som är disabled" disabled>
            <p>Hej hej</p>
          </Accordion.Item>
          <Accordion.Item header="Grej 3">
            <p>Hej hej</p>
          </Accordion.Item>
          <Accordion.Item header="Grej 4">
            <p>Hej hej</p>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

Template.storyName = 'Komponent';
