import { Meta } from '@storybook/react';
import React from 'react';
import { Accordion, AccordionProps } from '../src';
import Label from '@sk-web-gui/label';

export default {
  title: 'Komponenter/Accordion',
  component: Accordion.Component,
  tags: ['autodocs'],
} as Meta<typeof Accordion.Component>;

export const Template = (args: React.ComponentPropsWithRef<AccordionProps['Component']>) => {
  return (
    <div className="flex flex-col gap-32">
      <p>
        En accordion är en platsbesparande komponent där användaren kan expandera och kollapsa paneler för att enkelt få
        tillgång till information. Används ofta för FAQ och strukturerad innehållsvisning.
      </p>
      <p>
        Här fungerar den som en onumrerad lista där varje listpunkt innehåller en Disclosure. Den har även ett gemensamt
        context som kan styra om en eller flera ska vara öppna samtidigt.
      </p>
      <div className="min-h-[30rem]">
        <Accordion {...args}>
          <Accordion.Item>
            <Accordion.Item.Header>
              <Accordion.Item.Title>Sök skolskjuts innan den 30 april</Accordion.Item.Title>
              <Label color="error" rounded>
                15
              </Label>
              <Accordion.Item.Button />
            </Accordion.Item.Header>
            <Accordion.Item.Content>
              <p>
                Har du barn som är i behov av skolskjuts måste du ansöka innan den 30 april inför hösten 2021. Detta
                gäller elever som går i förskoleklass, grundskola och gymnasiesärskola.
              </p>
            </Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Item.Header>
              <Accordion.Item.Title>Sök skolskjuts innan den 30 november</Accordion.Item.Title>
              <Accordion.Item.Button />
            </Accordion.Item.Header>
            <Accordion.Item.Content>
              <p>Hej hej</p>
            </Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Item.Header>
              <Accordion.Item.Title>Regler kring skolskjutsar</Accordion.Item.Title>
              <Accordion.Item.Button />
            </Accordion.Item.Header>
            <Accordion.Item.Content>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero placeat eveniet quas nulla saepe minus
                recusandae quis obcaecati necessitatibus. Quidem.
              </p>
            </Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

Template.storyName = 'Accordion';
