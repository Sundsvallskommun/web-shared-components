import React from 'react';
import { Meta } from '@storybook/react';
import { AlertBanner, AlertBannerProps } from '../src';
import { useLocalStorageValue } from '@react-hookz/web';

export default {
  title: 'Komponenter/Meddelanden/AlertBanner',
  component: AlertBanner,
  parameters: { controls: { hideNoControlsWarning: true } },
  tags: ['autodocs'],
  args: {
    children:
      'Viktig men också väldigt lång information om driftstörningar. Så lång att texten är längre än 800px och inte längre får plats på en rad utan hamnar istället på två eller flera rader',
  },
} as Meta;

export const Template = ({ children, ...args }: AlertBannerProps) => {
  const localstorageKey = 'alert-banner-is-open';
  const { value: open, set: setOpen } = useLocalStorageValue(localstorageKey, {
    defaultValue: true,
    initializeWithValue: true,
  });

  const handleReset = () => {
    setOpen(true);
  };

  return (
    <div className="min-h-[200px]">
      <AlertBanner {...args}>{children}</AlertBanner>
      <div className="w-full h-[50px] border-y-2 text-center">Ett sidhuvud</div>
      <button className="link mb-md absolute bottom-0" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

Template.storyName = 'AlertBanner';
