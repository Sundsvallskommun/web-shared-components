import { IconButton } from '../src';
import { Announcement } from './announcement';

export default {
  title: 'WIP/Komponenter/IconButton',
  component: IconButton,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Outline = () => (
  <div className="flex space-x-2">
    <IconButton>
      <Announcement size={16} />
    </IconButton>

    <IconButton color="primary">
      <Announcement size={16} />
    </IconButton>

    <IconButton color="orange">
      <Announcement size={16} />
    </IconButton>

    <IconButton className="rounded-full">
      <Announcement size={16} />
    </IconButton>

    <IconButton color="primary" className="rounded-full">
      <Announcement size={16} />
    </IconButton>
  </div>
);

export const Solid = () => (
  <div className="flex space-x-2">
    <IconButton variant="solid">
      <Announcement size={16} />
    </IconButton>

    <IconButton variant="solid" color="primary">
      <Announcement size={16} />
    </IconButton>

    <IconButton variant="solid" color="orange">
      <Announcement size={16} />
    </IconButton>

    <IconButton variant="solid" className="rounded-full">
      <Announcement size={16} />
    </IconButton>

    <IconButton variant="solid" color="primary" className="rounded-full">
      <Announcement size={16} />
    </IconButton>
  </div>
);

export const Light = () => (
  <div className="flex space-x-2">
    <IconButton variant="light">
      <Announcement size={16} />
    </IconButton>

    <IconButton variant="light" color="primary">
      <Announcement size={16} />
    </IconButton>

    <IconButton variant="light" color="orange">
      <Announcement size={16} />
    </IconButton>

    <IconButton variant="light" className="rounded-full">
      <Announcement size={16} />
    </IconButton>

    <IconButton variant="light" color="primary" className="rounded-full">
      <Announcement size={16} />
    </IconButton>
  </div>
);

export const Ghost = () => (
  <div className="flex space-x-2">
    <IconButton variant="ghost">
      <Announcement size={16} />
    </IconButton>

    <IconButton variant="ghost" color="primary">
      <Announcement size={16} />
    </IconButton>

    <IconButton variant="ghost" color="orange">
      <Announcement size={16} />
    </IconButton>

    <IconButton variant="ghost" className="rounded-full">
      <Announcement size={16} />
    </IconButton>

    <IconButton variant="ghost" color="primary" className="rounded-full">
      <Announcement size={16} />
    </IconButton>
  </div>
);

export const Size = () => (
  <div className="flex space-x-2">
    <IconButton variant="solid" color="primary">
      <Announcement size={14} />
    </IconButton>
    <IconButton size="sm" variant="solid" color="primary">
      <Announcement size={16} />
    </IconButton>
    <IconButton size="md" variant="solid" color="primary">
      <Announcement size={16} />
    </IconButton>
    <IconButton size="lg" variant="solid" color="primary">
      <Announcement size={24} />
    </IconButton>
    <IconButton variant="solid" color="primary">
      <Announcement size={32} />
    </IconButton>
  </div>
);
