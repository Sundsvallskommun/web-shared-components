import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Tag, TagProps } from "../src";

export default {
  title: "Komponenter/Etiketter|Taggar/Komponent",
  component: Tag,
  parameters: { controls: { hideNoControlsWarning: true } },
} as Meta;

export const Template = ({ text, ...args }: any) => (
  <Tag {...args}>{text}</Tag>
);

export const Outline = ({ text, ...args }: any) => (
  <>
    <div className="flex w-full place-content-evenly">
      <Tag size="lg">Large</Tag>
      <Tag>Medium</Tag>
      <Tag size="sm">Small</Tag>
    </div>
    <div className="flex w-full place-content-evenly">
      <Tag useDeleteButton size="lg">Large</Tag>
      <Tag useDeleteButton>Medium</Tag>
      <Tag useDeleteButton size="sm">Small</Tag>
    </div>
    <div className="flex w-full place-content-evenly">
      <Tag href="#" size="lg">Large a-element</Tag>
      <Tag href="#">Medium a-element</Tag>
      <Tag href="#" size="sm">Small a-element</Tag>
    </div>
  </>
);

export const Solid = ({ text, ...args }: any) => (
  <>
    <div className="flex w-full place-content-evenly">
      <Tag size="lg" variant="solid">Large</Tag>
      <Tag variant="solid">Medium</Tag>
      <Tag size="sm" variant="solid">Small</Tag>
    </div>
    <div className="flex w-full place-content-evenly">
      <Tag useDeleteButton size="lg" variant="solid">Large</Tag>
      <Tag useDeleteButton variant="solid">Medium</Tag>
      <Tag useDeleteButton size="sm" variant="solid">Small</Tag>
    </div>
    <div className="flex w-full place-content-evenly">
      <Tag href="#" size="lg" variant="solid">Large a-element</Tag>
      <Tag href="#" variant="solid">Medium a-element</Tag>
      <Tag href="#" size="sm" variant="solid">Small a-element</Tag>
    </div>
  </>
);

export const Light = ({ text, ...args }: any) => (
  <>
    <div className="flex w-full place-content-evenly">
      <Tag size="lg" variant="light">Large</Tag>
      <Tag variant="light">Medium</Tag>
      <Tag size="sm" variant="light">Small</Tag>
    </div>
    <div className="flex w-full place-content-evenly">
      <Tag useDeleteButton size="lg" variant="light">Large</Tag>
      <Tag useDeleteButton variant="light">Medium</Tag>
      <Tag useDeleteButton size="sm" variant="light">Small</Tag>
    </div>
    <div className="flex w-full place-content-evenly">
      <Tag href="#" size="lg" variant="light">Large a-element</Tag>
      <Tag href="#" variant="light">Medium a-element</Tag>
      <Tag href="#" size="sm" variant="light">Small a-element</Tag>
    </div>
  </>
);

Template.argTypes = {
  text: {
    type: { name: 'string', required: false },
    description: 'Sets tag text',
    control: 'text',
    defaultValue: 'Etikett-text',
  },
  variant: {
    type: { name: 'string', required: false },
    description: 'Sets variant',
    table: {
      defaultValue: { summary: 'outline' },
    },
    options: ['outline', 'solid', 'light'],
    control: 'select',
    defaultValue: 'outline',
  },
  size: {
    type: { name: 'string', required: false },
    description: 'Sets size',
    table: {
      defaultValue: { summary: 'md' },
    },
    options: ['sm', 'md', 'lg'],
    control: 'select',
    defaultValue: 'md',
  },
  useDeleteButton: {
    type: { name: 'boolean', required: false },
    description: 'Set true to use delete button',
    table: {
      defaultValue: { summary: false },
    },
    options: [false, true],
    control: 'boolean',
    defaultValue: false,
  },
  deleteAriaLabel: {
    type: { name: 'string', required: false },
    description: 'Sets delete button aria-label',
    table: {
      defaultValue: { summary: '' },
    },
    control: 'text',
    defaultValue: 'Remove tag',
  },
  href: {
    type: { name: 'string', required: false },
    description: 'Sets href',
    table: {
      defaultValue: { summary: '' },
    },
    control: 'text',
    defaultValue: '',
  },
};