import { Meta } from '@storybook/react';
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
      <Input.Group disabled>
        <Input.LeftAddin children="https://" />
        <TextField placeholder="mysite" type="url" />
        <Input.RightAddin children=".com" />
      </Input.Group>
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
      <Input.Group readOnly>
        <Input.LeftAddin children="https://" />
        <TextField placeholder="mysite" type="url" />
        <Input.RightAddin children=".com" />
      </Input.Group>
    </div>
  </div>
);
Readonly.storyName = 'Readonly';

export const Invalid = () => (
  <div>
    <div className="flex gap-16">
      <TextField placeholder="example@mail.com" type="email" invalid />
    </div>
    <div className="flex mt-md gap-16">
      <Input.Group invalid>
        <Input.LeftAddin children="https://" />
        <TextField placeholder="mysite" type="url" />
        <Input.RightAddin children=".com" />
      </Input.Group>
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
        <Input.Group>
          <Input.LeftAddin children="https://" />
          <TextField placeholder="mysite" type="url" />
          <Input.RightAddin children=".com" />
        </Input.Group>
      </div>
      <div className="flex flex-wrap items-center w-full gap-16">
        <Input.Group size="md">
          <Input.LeftAddin icon>
            <Icon icon={<User />} />
          </Input.LeftAddin>
          <TextField placeholder="Användarnamn" />
        </Input.Group>
      </div>
      <div className="flex flex-wrap items-center w-full gap-16">
        <Input.Group size="md">
          <TextField placeholder="Lösenord" type={showPass ? 'text' : 'password'} />
          <Input.RightAddin icon>
            <span aria-label={showPass ? 'Dölj lösenord' : 'Visa lösenord'} role="button" onClick={() => setShowPass(!showPass)}>
              {showPass ? <Icon icon={<EyeOff />} /> : <Icon icon={<Eye />} />}
            </span>
          </Input.RightAddin>
        </Input.Group>
      </div>
    </div>
  );
};
