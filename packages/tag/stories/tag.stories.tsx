import React from 'react';
import { Meta } from '@storybook/react';
import { Tag, TagProps } from '../src';

export default {
  title: 'Komponenter/Etiketter|Taggar/Komponent',
  component: Tag,
  tags: ['autodocs'],
  args: {
    children: 'Taggnamn',
  },
} as Meta;

export const Template = ({ children, ...args }: TagProps) => <Tag {...args}>{children}</Tag>;

Template.storyName = 'Tag';

export const Outline = () => (
  <>
    <div className="flex w-full place-content-evenly">
      <Tag size="lg">Large</Tag>
      <Tag>Medium</Tag>
      <Tag size="sm">Small</Tag>
    </div>
    <div className="flex w-full place-content-evenly">
      <Tag useDeleteButton size="lg">
        Large
      </Tag>
      <Tag useDeleteButton>Medium</Tag>
      <Tag useDeleteButton size="sm">
        Small
      </Tag>
    </div>
    <div className="flex w-full place-content-evenly">
      <Tag href="#" size="lg">
        Large a-element
      </Tag>
      <Tag href="#">Medium a-element</Tag>
      <Tag href="#" size="sm">
        Small a-element
      </Tag>
    </div>
  </>
);

export const Solid = () => (
  <>
    <div className="flex w-full place-content-evenly">
      <Tag size="lg" variant="solid">
        Large
      </Tag>
      <Tag variant="solid">Medium</Tag>
      <Tag size="sm" variant="solid">
        Small
      </Tag>
    </div>
    <div className="flex w-full place-content-evenly">
      <Tag useDeleteButton size="lg" variant="solid">
        Large
      </Tag>
      <Tag useDeleteButton variant="solid">
        Medium
      </Tag>
      <Tag useDeleteButton size="sm" variant="solid">
        Small
      </Tag>
    </div>
    <div className="flex w-full place-content-evenly">
      <Tag href="#" size="lg" variant="solid">
        Large a-element
      </Tag>
      <Tag href="#" variant="solid">
        Medium a-element
      </Tag>
      <Tag href="#" size="sm" variant="solid">
        Small a-element
      </Tag>
    </div>
  </>
);

export const Light = () => (
  <>
    <div className="flex w-full place-content-evenly">
      <Tag size="lg" variant="light">
        Large
      </Tag>
      <Tag variant="light">Medium</Tag>
      <Tag size="sm" variant="light">
        Small
      </Tag>
    </div>
    <div className="flex w-full place-content-evenly">
      <Tag useDeleteButton size="lg" variant="light">
        Large
      </Tag>
      <Tag useDeleteButton variant="light">
        Medium
      </Tag>
      <Tag useDeleteButton size="sm" variant="light">
        Small
      </Tag>
    </div>
    <div className="flex w-full place-content-evenly">
      <Tag href="#" size="lg" variant="light">
        Large a-element
      </Tag>
      <Tag href="#" variant="light">
        Medium a-element
      </Tag>
      <Tag href="#" size="sm" variant="light">
        Small a-element
      </Tag>
    </div>
  </>
);
