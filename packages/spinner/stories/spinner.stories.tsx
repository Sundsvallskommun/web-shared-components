import React from 'react';
import { Spinner } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Spinner',
  component: Spinner,
  tags: ['autodocs'],
} as Meta<typeof Spinner>;

export const Template = () => (
  <div className="flex space-x-2">
    <Spinner />
    <Spinner className="text-primary-500" />
  </div>
);

Template.storyName = 'Spinner';

export const Storlekar = () => (
  <div className="flex space-x-2">
    <Spinner size="xs" />
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
    <Spinner size="xl" />
  </div>
);
