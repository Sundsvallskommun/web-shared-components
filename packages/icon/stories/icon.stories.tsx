import React from 'react';
import { Icon, InfoIcon, XCricleIcon, CheckCircleIcon, ExclamationIcon } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'WIP/Komponenter/Ikoner',
  component: Icon,
  tags: ['autodocs'],
} as Meta;

export const Template = () => (
  <div className="flex space-x-6">
    <Icon as={() => <span className="material-icons">check</span>} label="test" />
    <Icon as={InfoIcon} label="info" className="w-6 h-6 text-blue-500" />
    <Icon as={XCricleIcon} label="x-circle" className="w-6 h-6 text-green-500" />
    <Icon as={CheckCircleIcon} label="check-circle" className="w-6 h-6 text-red-500" />
    <Icon as={ExclamationIcon} label="exclamationI" className="w-6 h-6 text-yellow-500" />
  </div>
);

Template.storyName = 'Icon';
