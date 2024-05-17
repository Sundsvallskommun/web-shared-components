import React from 'react';
import { Input, InputProps } from '../src';
import { Meta } from '@storybook/react';
import { Icon } from '@sk-web-gui/icon';

export default {
  title: 'Komponenter/Formulär',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Sök...',
  },
} as Meta<typeof Input>;

export const Template = (args: React.ComponentPropsWithRef<InputProps['Component']>) => {
  return <Input {...args} />;
};

Template.storyName = 'Input';

export const Disabled = () => (
  <div>
    <div className="flex gap-16">
      <Input placeholder="example@mail.com" disabled />
    </div>
    <div className="flex mt-md gap-16">
      <Input.Group disabled>
        <Input.LeftAddin children="https://" />
        <Input placeholder="mysite" />
        <Input.RightAddin children=".com" />
      </Input.Group>
    </div>
  </div>
);
Disabled.storyName = 'Inaktiverad';

export const Invalid = () => (
  <div>
    <div className="flex gap-16">
      <Input placeholder="example@mail.com" invalid />
    </div>
    <div className="flex mt-md gap-16">
      <Input.Group invalid>
        <Input.LeftAddin children="https://" />
        <Input placeholder="mysite" />
        <Input.RightAddin children=".com" />
      </Input.Group>
    </div>
  </div>
);
Invalid.storyName = 'Invaliderad';

export const Storlekar = () => (
  <div className="flex flex-col gap-16">
    <div className="flex gap-16">
      <Input placeholder="example@mail.com" size="sm" type="email" />
      <Input placeholder="example@mail.com" size="md" type="email" />
      <Input placeholder="example@mail.com" size="lg" type="email" />
    </div>
    <div className="flex flex-col mt-md gap-16 w-fit">
      <Input.Group size="sm">
        <Input.LeftAddin children="https://" />
        <Input placeholder="mysite" />
        <Input.RightAddin children=".com" />
      </Input.Group>
      <Input.Group size="md">
        <Input.LeftAddin children="https://" />
        <Input placeholder="mysite" />
        <Input.RightAddin children=".com" />
      </Input.Group>
      <Input.Group size="lg">
        <Input.LeftAddin children="https://" />
        <Input placeholder="mysite" />
        <Input.RightAddin children=".com" />
      </Input.Group>
    </div>
  </div>
);

export const Datum = () => (
  <div className="flex flex-col gap-16">
    <div className="flex gap-16">
      <Input size="sm" type="date" />
      <Input size="md" type="date" />
      <Input size="lg" type="date" />
    </div>
  </div>
);

export const Tid = () => (
  <div className="flex flex-col gap-16">
    <div className="flex gap-16">
      <Input size="sm" type="time" />
      <Input size="md" type="time" />
      <Input size="lg" type="time" />
    </div>
  </div>
);

export const DatumTid = () => (
  <div className="flex flex-col gap-16">
    <div className="flex gap-16">
      <Input size="sm" type="datetime-local" />
      <Input size="md" type="datetime-local" />
      <Input size="lg" type="datetime-local" />
    </div>
  </div>
);

export const Addin = () => {
  const [showPass, setShowPass] = React.useState(false);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-wrap items-center w-full gap-16">
        <Input.Group size="sm">
          <Input.LeftAddin children="https://" />
          <Input placeholder="mysite" />
          <Input.RightAddin children=".com" />
        </Input.Group>

        <Input.Group size="md">
          <Input.LeftAddin children="https://" />
          <Input placeholder="mysite" />
          <Input.RightAddin children=".com" />
        </Input.Group>

        <Input.Group size="lg">
          <Input.LeftAddin children="https://" />
          <Input placeholder="mysite" />
          <Input.RightAddin children=".com" />
        </Input.Group>
      </div>
      <div className="flex flex-wrap items-center w-full gap-16">
        <Input.Group size="sm">
          <Input placeholder="Lösenord" type={showPass ? 'text' : 'password'} />
          <Input.RightAddin icon>
            <span role="button" onClick={() => setShowPass(!showPass)}>
              {showPass ? <Icon name="eye-off" /> : <Icon name="eye" />}
            </span>
          </Input.RightAddin>
        </Input.Group>

        <Input.Group size="md">
          <Input placeholder="Lösenord" type={showPass ? 'text' : 'password'} />
          <Input.RightAddin icon>
            <span role="button" onClick={() => setShowPass(!showPass)}>
              {showPass ? <Icon name="eye-off" /> : <Icon name="eye" />}
            </span>
          </Input.RightAddin>
        </Input.Group>

        <Input.Group size="lg">
          <Input placeholder="Lösenord" type={showPass ? 'text' : 'password'} />
          <Input.RightAddin icon>
            <span role="button" onClick={() => setShowPass(!showPass)}>
              {showPass ? <Icon name="eye-off" /> : <Icon name="eye" />}
            </span>
          </Input.RightAddin>
        </Input.Group>
      </div>
      <div className="flex flex-wrap items-center w-full gap-16">
        <Input.Group size="sm">
          <Input.LeftAddin icon>
            <Icon name="credit-card" />
          </Input.LeftAddin>
          <Input placeholder="Kontokort" />
        </Input.Group>

        <Input.Group size="md">
          <Input.LeftAddin icon>
            <Icon name="credit-card" />
          </Input.LeftAddin>
          <Input placeholder="Kontokort" />
        </Input.Group>

        <Input.Group size="lg">
          <Input.LeftAddin icon>
            <Icon name="credit-card" />
          </Input.LeftAddin>
          <Input placeholder="Kontokort" />
        </Input.Group>
      </div>
    </div>
  );
};
