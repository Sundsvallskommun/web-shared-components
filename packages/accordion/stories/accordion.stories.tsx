import { Badge } from '@sk-web-gui/badge';
import { Meta } from '@storybook/react';
import { Accordion, AccordionProps } from '../src';

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
                Sök skolskjuts innan den 30 april <Badge color="error" size="md" counter={15} />
              </>
            }
          >
            <p>
              Har du barn som är i behov av skolskjuts måste du ansöka innan den 30 april inför hösten 2021. Detta
              gäller elever som går i förskoleklass, grundskola och gymnasiesärskola.
            </p>
          </Accordion.Item>
          <Accordion.Item header="Sök skolskjuts innan den 30 november" disabled>
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
    </>
  );
};

Template.storyName = 'Komponent';
