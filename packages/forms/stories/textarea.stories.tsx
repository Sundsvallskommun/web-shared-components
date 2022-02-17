import { Textarea } from "../src";

export default {
  title: "Komponenter/Textarea",
  component: Textarea,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const basic = () => <Textarea placeholder="name@example.com" />;

export const disabled = () => <Textarea disabled placeholder="name@example.com" />;

export const invalid = () => <Textarea invalid placeholder="name@example.com" />;

export const variant = () => (
  <div className="flex flex-col space-y-4">
    <Textarea placeholder="name@example.com" />
    <Textarea placeholder="name@example.com" variant="solid" />
  </div>
)

export const colored = () => (
  <Textarea placeholder="name@example.com" color="secondary" />
);
