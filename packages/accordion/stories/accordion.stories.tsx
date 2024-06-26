import { Meta } from '@storybook/react';
import React from 'react';
import { Accordion, AccordionProps } from '../src';

export default {
  title: 'Komponenter/Accordion',
  component: Accordion.Component,
  tags: ['autodocs'],
} as Meta<typeof Accordion.Component>;

export const Template = (args: React.ComponentPropsWithRef<AccordionProps['Component']>) => {
  return (
    <div className="h-[30rem]">
      <Accordion {...args}>
        <Accordion.Item label="15" labelColor="error" header="Sök skolskjuts innan den 30 april">
          <p>
            Har du barn som är i behov av skolskjuts måste du ansöka innan den 30 april inför hösten 2021. Detta gäller
            elever som går i förskoleklass, grundskola och gymnasiesärskola.
          </p>
        </Accordion.Item>
        <Accordion.Item header="Sök skolskjuts innan den 30 november">
          <p>Hej hej</p>
        </Accordion.Item>
        <Accordion.Item header="Regler kring skolskjutsar">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero placeat eveniet quas nulla saepe minus
            recusandae quis obcaecati necessitatibus. Quidem.
          </p>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

Template.storyName = 'Accordion';
