import { Input } from '../src';
import { Check } from './check';

export default {
  title: 'Komponenter/Textfält/Komponent/Inputs',
  component: Input,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Basic = () => <Input placeholder="jon@gmail.com" />;
Basic.storyName = 'Komponent';

export const Colored = () => <Input color="orange" placeholder="jon@gmail.com" />;
Colored.storyName = 'Färgad';

export const Disabled = () => (
  <div className="flex space-x-2">
    <Input placeholder="jon@gmail.com" disabled />
    <Input placeholder="jon@gmail.com" disabled variant="solid" />
  </div>
);
Disabled.storyName = 'Inaktiverad';

export const Invalid = () => (
  <div className="flex space-x-2">
    <Input placeholder="jon@gmail.com" invalid />
    <Input placeholder="jon@gmail.com" invalid variant="solid" />
  </div>
);
Invalid.storyName = 'Inaktiverad';

export const Variant = () => (
  <div className="flex space-x-2">
    <Input placeholder="jon@gmail.com" />
    <Input placeholder="jon@gmail.com" variant="solid" />
  </div>
);

export const Size = () => (
  <div className="flex space-x-2">
    <Input placeholder="jon@gmail.com" size="sm" />
    <Input placeholder="jon@gmail.com" size="md" />
    <Input placeholder="jon@gmail.com" size="lg" />
  </div>
);

export const Element = () => (
  <div className="flex flex-wrap w-full space-x-2">
    <Input.Group size="md">
      <Input.LeftElement children="$" className="pointer-events-none text-neutral-300" />
      <Input placeholder="ben@gmail.com" />
      <Input.RightElement children={<Check className="text-green-500" size={14} />} />
    </Input.Group>

    <Input.Group size="sm">
      <Input.LeftElement children="$" className="pointer-events-none text-neutral-300" />
      <Input placeholder="ben@gmail.com" />
      <Input.RightElement children={<Check className="text-green-500" size={14} />} />
    </Input.Group>

    <Input.Group size="md">
      <Input.LeftElement children="$" className="pointer-events-none text-neutral-300" />
      <Input placeholder="ben@gmail.com" />
      <Input.RightElement children={<Check className="text-green-500" size={16} />} />
    </Input.Group>

    <Input.Group size="lg">
      <Input.LeftElement children="$" className="pointer-events-none text-neutral-300" />
      <Input placeholder="ben@gmail.com" />
      <Input.RightElement children={<Check className="text-green-500" size={24} />} />
    </Input.Group>

    <Input.Group size="md">
      <Input.LeftElement children="$" className="pointer-events-none text-neutral-300" />
      <Input placeholder="ben@gmail.com" />
      <Input.RightElement children={<Check className="text-green-500" size={32} />} />
    </Input.Group>
  </div>
);

export const Addon = () => (
  <div className="flex flex-wrap items-center w-full">
    <Input.Group size="md" className="mb-2 mr-2">
      <Input.LeftAddon children="https://" />
      <Input placeholder="mysite" />
      <Input.RightAddon children=".com" />
    </Input.Group>

    <Input.Group size="sm" className="mb-2 mr-2">
      <Input.LeftAddon children="https://" />
      <Input placeholder="mysite" />
      <Input.RightAddon children=".com" />
    </Input.Group>

    <Input.Group size="md" className="mb-2 mr-2">
      <Input.LeftAddon children="https://" />
      <Input placeholder="mysite" />
      <Input.RightAddon children=".com" />
    </Input.Group>

    <Input.Group size="lg" className="mb-2 mr-2">
      <Input.LeftAddon children="https://" />
      <Input placeholder="mysite" />
      <Input.RightAddon children=".com" />
    </Input.Group>
  </div>
);
