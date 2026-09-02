import { Meta } from '@storybook/react-vite';
import React from 'react';
import { Input } from '../src';
import { TextField, TextFieldProps } from '../src/text-field/text-field';
import { Icon } from '@sk-web-gui/icon';
import { Eye, EyeOff, User } from 'lucide-react';

export default {
  title: 'Komponenter/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: {
    placeholder: 'Textfält',
  },
} as Meta<typeof TextField>;

export const Template = (args: TextFieldProps) => {
  return (
    <div>
      <TextField {...args} />
      <p className="my-16 text-small">
        TextField är ett fält för text. Samma som Formulär/Input men begränsad till text
      </p>
    </div>
  );
};

Template.storyName = 'TextField';

export const Disabled = () => (
  <div>
    <div className="flex gap-16">
      <TextField placeholder="example@mail.com" type="email" disabled />
    </div>
    <div className="flex mt-md gap-16">
      <Input.InnerGroup disabled>
        <Input.LeftAddin children="https://" />
        <TextField placeholder="mysite" type="url" />
        <Input.RightAddin children=".com" />
      </Input.InnerGroup>
    </div>
  </div>
);
Disabled.storyName = 'Inaktiverad';

export const Readonly = () => (
  <div>
    <div className="flex gap-16">
      <TextField placeholder="example@mail.com" type="email" readOnly />
    </div>
    <div className="flex mt-md gap-16">
      <Input.InnerGroup readOnly>
        <Input.LeftAddin children="https://" />
        <TextField placeholder="mysite" type="url" />
        <Input.RightAddin children=".com" />
      </Input.InnerGroup>
    </div>
  </div>
);

export const Invalid = () => (
  <div>
    <div className="flex gap-16">
      <TextField placeholder="example@mail.com" type="email" invalid />
    </div>
    <div className="flex mt-md gap-16">
      <Input.InnerGroup invalid>
        <Input.LeftAddin children="https://" />
        <TextField placeholder="mysite" type="url" />
        <Input.RightAddin children=".com" />
      </Input.InnerGroup>
    </div>
  </div>
);
Invalid.storyName = 'Invaliderad';

export const Storlekar = () => (
  <div className="flex flex-col gap-16">
    <div className="flex gap-16">
      <TextField placeholder="example@mail.com" size="sm" type="email" />
      <TextField placeholder="example@mail.com" size="md" type="email" />
      <TextField placeholder="example@mail.com" size="lg" type="email" />
    </div>
  </div>
);

export const Addin = () => {
  const [showPass, setShowPass] = React.useState(false);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-wrap items-center w-full gap-16">
        <Input.InnerGroup>
          <Input.LeftAddin children="https://" />
          <TextField placeholder="mysite" type="url" />
          <Input.RightAddin children=".com" />
        </Input.InnerGroup>
      </div>
      <div className="flex flex-wrap items-center w-full gap-16">
        <Input.InnerGroup size="md">
          <Input.LeftAddin icon>
            <Icon icon={<User />} />
          </Input.LeftAddin>
          <TextField placeholder="Användarnamn" />
        </Input.InnerGroup>
      </div>
      <div className="flex flex-wrap items-center w-full gap-16">
        <Input.InnerGroup size="md">
          <TextField placeholder="Lösenord" type={showPass ? 'text' : 'password'} />
          <Input.RightAddin icon>
            <button
              aria-label={showPass ? 'Dölj lösenord' : 'Visa lösenord'}
              className="flex justify-center items-center"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <Icon icon={<EyeOff />} /> : <Icon icon={<Eye />} />}
            </button>
          </Input.RightAddin>
        </Input.InnerGroup>
      </div>
    </div>
  );
};
