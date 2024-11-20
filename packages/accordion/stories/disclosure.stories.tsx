import { LucideIcon } from '@sk-web-gui/lucide-icon';
import { Meta } from '@storybook/react';
import { Disclosure, DisclosureProps } from '../src';

export default {
  title: 'Komponenter/Accordion/Disclosure',
  component: Disclosure,
  tags: ['autodocs'],
  args: {
    header: 'En vanlig fråga',
  },
} as Meta<typeof Disclosure>;

export const Template = (args: DisclosureProps) => {
  return (
    <>
      <Disclosure {...args}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero placeat eveniet quas nulla saepe minus
          recusandae quis obcaecati necessitatibus. Quidem.
        </p>
      </Disclosure>
    </>
  );
};

Template.storyName = 'Disclosure';

export const AlternativeVariant = () => {
  return (
    <>
      <Disclosure variant="alt" header="Sök skolskjuts innan den 30 april" icon={<LucideIcon name="bus" />}>
        <p>
          Har du barn som är i behov av skolskjuts måste du ansöka innan den 30 april inför hösten 2021. Detta gäller
          elever som går i förskoleklass, grundskola och gymnasiesärskola.
        </p>
      </Disclosure>
    </>
  );
};
