import React from 'react';
import { Meta } from '@storybook/react';
import { Header, HeaderProps } from '../src';
import { UserMenu } from '@sk-web-gui/user-menu';

export default {
  title: 'Komponenter/Header/Komponent',
  component: Header,
  tags: ['autodocs'],
} as Meta;

export const Template = ({ ...args }: HeaderProps) => {
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
