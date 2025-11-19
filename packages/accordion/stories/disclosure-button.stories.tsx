import Icon from '@sk-web-gui/icon';
import { Meta } from '@storybook/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Disclosure, DisclosureProps } from '../src';

export default {
  title: 'Komponenter/Accordion/Disclosure/Button',
  component: Disclosure.Button,
  tags: ['autodocs'],
} as Meta<typeof Disclosure.Button>;

export const Template = (args: React.ComponentPropsWithRef<DisclosureProps['Button']>) => {
  return (
    <div className="flex flex-col gap-32">
      <p>
        Disclosure.Button är en knapp som hör till Disclosure, och placeras i dess header för att kontrollera
        öppet-state.
      </p>
      <p>Den ärver automatiskt rätt aria-roller och styling</p>

      <Disclosure.Button {...args} />
    </div>
  );
};

Template.storyName = 'Disclosure Button';

export const CustomButton = () => {
  return (
    <div className="flex flex-col gap-32">
      <p>
        Knappen visar automatiskt <code>{`+`} </code> eller <code>{`-`} </code> beroende på om den är öppen eller
        stängd. Om du vill byta ikon eller på annat vis ändra utseende på knappen så är det fritt fram att använda din
        egen knapp. Men då måste du hantera openstate externt.
      </p>
      <p>
        Om du önskar hantera openstate automatiskt men ändå ändra utseende på knappen så kan du modifiera utseendet på
        samma sätt som du kan ändra <code>{`<Button/>`}</code>.
      </p>
      <p>
        Du får enkelt ut openstate på följande vis:
        <br />
        <code>
          {`<Disclosure.Button>`}
          <br />
          {`      {(open: boolean) => <Icon icon={open ? <ChevronUp /> : <ChevronDown />} />}`}
          <br />
          {`</Disclosure.Button>`}
        </code>
      </p>

      <Disclosure>
        <Disclosure.Header>
          <Disclosure.Button>
            {(open: boolean) => <Icon icon={open ? <ChevronUp /> : <ChevronDown />} />}
          </Disclosure.Button>
        </Disclosure.Header>
      </Disclosure>
    </div>
  );
};
