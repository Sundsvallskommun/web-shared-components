import { LucideIcon } from '@sk-web-gui/lucide-icon';
import { Meta } from '@storybook/react';
import { Disclosure, DisclosureProps } from '../src';
import Icon from '@sk-web-gui/icon';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Label from '@sk-web-gui/label';

export default {
  title: 'Komponenter/Accordion/Disclosure',
  component: Disclosure.Component,
  tags: ['autodocs'],
} as Meta<typeof Disclosure.Component>;

export const Template = (args: React.ComponentPropsWithRef<DisclosureProps['Component']>) => {
  return (
    <div className="flex flex-col gap-32">
      <p>
        Disclosure är en platsbesparande komponent där användaren kan expandera och kollapsa paneler för att enkelt få
        tillgång till information. Disclosure används alltid en och en.
      </p>
      <p>Om du behöver ha flera paneler staplade på varandra rekommenderar vi Accordion.</p>
      <p>
        En disclosure består av 3 huvudsakliga delar.
        <br />
        <code>{`<Disclosure>`}</code> som är den yttersta wrappern.
        <br />
        <code>{`<Disclosure.Header>`}</code> innehåller rubrik och knapp.
        <br />
        <code>{`<Disclosure.Content>`}</code> där du placerar ditt innehålla som att går att dölja.
        <br />
      </p>
      <Disclosure {...args}>
        <Disclosure.Header>
          <Disclosure.Title>En vanlig fråga</Disclosure.Title>
          <Disclosure.Button />
        </Disclosure.Header>
        <Disclosure.Content>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero placeat eveniet quas nulla saepe minus
            recusandae quis obcaecati necessitatibus. Quidem.
          </p>
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
};

Template.storyName = 'Disclosure';

export const AlternativeVariant = () => {
  return (
    <div className="flex flex-col gap-32">
      <p>
        Disclosure finns i 2 huvudvarianter, <strong>default</strong> och <strong>alt</strong>.<br />
        Men du kan också anpassa utseende som sig passar.
      </p>
      <p>Alt-versionen med inledande ikon:</p>
      <Disclosure variant="alt">
        <Disclosure.Header>
          <Disclosure.Icon icon={<LucideIcon name="bus" />} />
          <Disclosure.Title>
            <h1>Sök skolskjuts innan den 30 april</h1>
          </Disclosure.Title>
          <Disclosure.Button />
        </Disclosure.Header>
        <Disclosure.Content>
          <p>
            Har du barn som är i behov av skolskjuts måste du ansöka innan den 30 april inför hösten 2021. Detta gäller
            elever som går i förskoleklass, grundskola och gymnasiesärskola.
          </p>
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
};

export const WithLabel = () => {
  return (
    <div className="flex flex-col gap-32">
      <p>
        Om du vill lägga till en label i header så du enkelt använda <code>{`<Label>12</Label>`} </code>
      </p>
      <Disclosure>
        <Disclosure.Header>
          <Disclosure.Title>
            <h1>Nya ärenden</h1>
          </Disclosure.Title>
          <Label color="gronsta">12</Label>
          <Disclosure.Button />
        </Disclosure.Header>
        <Disclosure.Content>
          <p>12 nya ärenden</p>
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
};

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
          <Disclosure.Title>
            <h3>Nya ärenden</h3>
          </Disclosure.Title>
          <span className="shrink-0">Denna använder chevron</span>
          <Disclosure.Button>
            {(open: boolean) => <Icon icon={open ? <ChevronUp /> : <ChevronDown />} />}
          </Disclosure.Button>
        </Disclosure.Header>
        <Disclosure.Content>
          <p>12 nya ärenden</p>
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
};
