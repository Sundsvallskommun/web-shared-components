import React from 'react';
import { Story, Meta } from '@storybook/react';
import { AlertBanner } from '../src';
import { useLocalStorageValue } from '@react-hookz/web';

export default {
  title: 'Komponenter/Alert-banner',
  component: AlertBanner,
  parameters: { controls: { hideNoControlsWarning: true } },
} as Meta;

export const Template = ({ text, children, ...args }: any) => {
  const localstorageKey = 'alert-banner-is-open';
  const [open, setOpen] = useLocalStorageValue(localstorageKey, true, {
    storeDefaultValue: true,
    initializeWithStorageValue: true,
  });

  const handleReset = () => {
    setOpen(true);
  };

  return (
    <>
      <button className="link mb-md" onClick={handleReset}>
        Reset
      </button>
      <AlertBanner {...args}>{children}</AlertBanner>
    </>
  );
};

Template.storyName = 'Alert-banner';

Template.argTypes = {
  children: {
    type: { name: 'string', required: false },
    description: 'Sets message',
    control: 'text',
    defaultValue:
      'Viktig men också väldigt lång information om driftstörningar. Så lång att texten är längre än 800px och inte längre får plats på en rad utan hamnar istället på två eller flera rader',
  },
  severity: {
    type: { name: 'string', required: false },
    description: 'Set severity',
    table: {
      defaultValue: { summary: 'info' },
    },
    options: ['info', 'warning', 'error', 'success', 'neutral'],
    control: 'select',
    defaultValue: 'info',
  },
  className: {
    type: { name: 'string', required: false },
    description: 'Sets className for top parent',
    control: 'text',
    defaultValue: undefined,
  },
  contentClassName: {
    type: { name: 'string', required: false },
    description: 'Sets className for content',
    control: 'text',
    defaultValue: undefined,
  },
  childrenClassName: {
    type: { name: 'string', required: false },
    description: 'Sets className for children',
    control: 'text',
    defaultValue: undefined,
  },
  showClose: {
    type: { name: 'boolean', required: false },
    description: 'Shows close button',
    table: {
      defaultValue: { summary: true },
    },
    control: 'boolean',
    defaultValue: true,
  },
  fromDate: {
    type: { name: 'Date', required: false },
    description: 'Date from which the alert-banner will be shown',
    control: 'date',
  },
  toDate: {
    type: { name: 'Date', required: false },
    description: 'Date to which the alert-banner will be shown',
    control: 'date',
  },
};
