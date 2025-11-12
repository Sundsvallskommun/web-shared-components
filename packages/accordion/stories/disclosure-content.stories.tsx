import { Meta } from '@storybook/react';
import { Disclosure, DisclosureProps } from '../src';

export default {
  title: 'Komponenter/Accordion/Disclosure/Content',
  component: Disclosure.Content,
  tags: ['autodocs'],
} as Meta<typeof Disclosure.Content>;

export const Template = (args: React.ComponentPropsWithRef<DisclosureProps['Content']>) => {
  return (
    <div className="flex flex-col gap-32">
      <p>
        Disclosure.Content är en panel som håller ditt innehåll.
        <br />
        Synligheten på denna komponent styrs av state i Disclosure.
      </p>
      <p>
        Om du har en Disclosure.Icon först i headern så får du matchande padding i denna komponent.
        <br />
        Detta kan du självklart skriva över med egen styling.
      </p>

      <Disclosure.Content {...args}>
        <p>Några rader som kan stå inuti en disclosure</p>
      </Disclosure.Content>
    </div>
  );
};

Template.storyName = 'Disclosure Content';
