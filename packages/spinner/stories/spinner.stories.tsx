import React from 'react';
import { Spinner } from '../src';

export default {
  title: 'Komponenter/Spinner/Komponent',
  component: Spinner,
  tags: ['autodocs'],
};

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
