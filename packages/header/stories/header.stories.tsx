import { UserMenu } from '@sk-web-gui/user-menu';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Header, HeaderProps } from '../src';

export default {
  title: 'Komponenter/Header/Komponent',
  component: Header,
  tags: ['autodocs'],
} as Meta<typeof Header>;

export const Template: StoryObj<typeof Header> = (args: HeaderProps) => {
  return (
    <Header
      {...args}
      className=" !max-w-[156rem]"
      // logoLinkOnClick={() => console.log('test')}
      // LogoLinkWrapperComponent={<a href="/start" />}
      userMenu={<UserMenu menuTitle="User menu" menuSubTitle="" menuGroups={[]} />}
    ></Header>
  );
};

Template.storyName = 'Header';
