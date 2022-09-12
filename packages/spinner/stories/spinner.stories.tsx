import { Spinner } from '../src';

export default {
  title: 'WIP/Komponenter/Spinner',
  component: Spinner,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Basic = () => (
  <div className="flex space-x-2">
    <Spinner />
    <Spinner className="text-primary-500" />
  </div>
);

export const Size = () => (
  <div className="flex space-x-2">
    <Spinner size="xs" />
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
    <Spinner size="xl" />
  </div>
);
