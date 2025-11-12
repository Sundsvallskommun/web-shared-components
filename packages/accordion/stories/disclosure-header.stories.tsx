import { LucideIcon } from '@sk-web-gui/lucide-icon';
import { Meta } from '@storybook/react';
import { Disclosure, DisclosureProps } from '../src';

export default {
  title: 'Komponenter/Accordion/Disclosure/Header',
  component: Disclosure.Header,
  tags: ['autodocs'],
} as Meta<typeof Disclosure.Header>;

export const Template = (args: React.ComponentPropsWithRef<DisclosureProps['Header']>) => {
  return (
    <div className="flex flex-col gap-32">
      <p>
        Disclosure.Header är headern i Disclosure. Den bör innehålla <br />
        <code>{`<Disclosure.Title>`}</code> som innehåller rubriken
        <br />
        <code>{`<Disclosure.Button>`}</code> som är knappen för att öppna och stänga.
      </p>
      <p>Dessa 2 komponenter kommer automatiskt att kopplas ihop för att följa korrekt tillgänglighetsmönster</p>

      <Disclosure.Header {...args}>
        <Disclosure.Title>En vanlig fråga</Disclosure.Title>
        <Disclosure.Button />
      </Disclosure.Header>
    </div>
  );
};

Template.storyName = 'Disclosure Header';

export const AlternativeVariant = () => {
  return (
    <div className="flex flex-col gap-32">
      <p>
        Disclosure finns i 2 huvudvarianter, <strong>default</strong> och <strong>alt</strong>.<br />
        Men du kan också anpassa utseende som sig passar.
      </p>
      <p>Alt-versionen med inledande ikon:</p>

      <Disclosure.Header>
        <Disclosure.Icon icon={<LucideIcon name="bus" />} />
        <Disclosure.Title>
          <h1>Sök skolskjuts innan den 30 april</h1>
        </Disclosure.Title>
        <Disclosure.Button />
      </Disclosure.Header>
    </div>
  );
};
