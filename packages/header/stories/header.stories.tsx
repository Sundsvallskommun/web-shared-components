import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Header } from '../src';
import { UserMenu } from '@sk-web-gui/react';

export default {
  title: 'WIP/Komponenter/Header',
  component: Header,
  parameters: { controls: { hideNoControlsWarning: true } },
} as Meta;

export const Template = ({ ...args }: any) => {
  return (
    <Header
      {...args}
      className=" !max-w-[156rem]"
      // LogoLinkWrapperComponent={
      //   <a href='/start' />
      // }
      userMenu={<UserMenu menuTitle="User menu" menuSubTitle="" menuGroups={[]} />}
    ></Header>
  );
};

Template.argTypes = {
  title: {
    type: { name: 'string', required: false },
    description: 'Sets title text',
    control: 'text',
    table: {
      defaultValue: { summary: '' },
    },
    defaultValue: 'Mina sidor',
  },
  borderColor: {
    type: { name: 'string', required: false },
    description: 'Sets borderColor',
    table: {
      defaultValue: { summary: 'primary' },
    },
    options: ['primary', 'secondary', 'none'],
    control: 'select',
    defaultValue: 'primary',
  },
  className: {
    type: { name: 'string', required: false },
    description: 'Sets className',
    table: {
      defaultValue: { summary: '' },
    },
    control: 'text',
    defaultValue: '',
  },
  wrapperClasses: {
    type: { name: 'string', required: false },
    description: 'Sets classes for top parent node',
    table: {
      defaultValue: { summary: '' },
    },
    control: 'text',
    defaultValue: '',
  },
  userMenuClasses: {
    type: { name: 'string', required: false },
    description: 'Sets classes for usermenu wrapper',
    table: {
      defaultValue: { summary: '' },
    },
    control: 'text',
    defaultValue: '',
  },
  userMenu: {
    type: { required: false },
    description: 'ReactNode',
    table: {
      defaultValue: { summary: 'undefined' },
    },
    defaultValue: undefined,
  },
  notificationsAlert: {
    type: { required: false },
    description: 'ReactNode',
    table: {
      defaultValue: { summary: 'undefined' },
    },
    defaultValue: undefined,
  },
  LogoLinkWrapperComponent: {
    type: { required: false },
    description: 'ReactNode, for wrapping the logo-link with e.g. Next/Link',
    table: {
      defaultValue: { summary: 'undefined' },
    },
    defaultValue: undefined,
  },
};

Template.storyName = 'Komponent';
