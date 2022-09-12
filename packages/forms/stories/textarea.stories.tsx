import { Textarea } from '../src';

export default {
  title: 'WIP/Komponenter/Textarea',
  component: Textarea,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Basic = () => <Textarea placeholder="name@example.com" />;

export const Disabled = () => <Textarea disabled placeholder="name@example.com" />;

export const Invalid = () => <Textarea invalid placeholder="name@example.com" />;

export const Variant = () => (
  <div className="flex flex-col space-y-4">
    <Textarea placeholder="name@example.com" />
    <Textarea placeholder="name@example.com" variant="solid" />
  </div>
);

export const Colored = () => <Textarea placeholder="name@example.com" color="secondary" />;

export const Counter = () => (
  <Textarea
    placeholder="name@example.com"
    color="secondary"
    showCount={true}
    maxLength={50}
    maxLengthWarningText="Some text"
  />
);
