import { Meta } from '@storybook/react';
import React from 'react';
import { MenuVertical, MenuVerticalProps } from '../src';

export default {
  title: 'Komponenter/Menu-vertical',
  component: MenuVertical,
  tags: ['autodocs'],
} as Meta<typeof MenuVertical>;

export const Template = (args: MenuVerticalProps) => {
  const [current, setCurrent] = React.useState<number | undefined>();

  const handleSetCurrent = (number: number) => {
    console.log('number', number);
    setCurrent(number);
  };

  return (
    <div className="w-[30.2rem]">
      <MenuVertical.Nav>
        <MenuVertical.BackButton>Kommunala förskolor</MenuVertical.BackButton>
        <MenuVertical.Label>Områden</MenuVertical.Label>
        <MenuVertical {...args}>
          <MenuVertical.Item>
            <a href="#">test</a>
          </MenuVertical.Item>
          <MenuVertical.Item>
            <MenuVertical {...args}>
              <MenuVertical.SubmenuButton>Alnö</MenuVertical.SubmenuButton>
              <MenuVertical.Item>
                <a href="#">Fyrens förskola</a>
              </MenuVertical.Item>
              <MenuVertical.Item>
                <a href="#">Lanternans förskola</a>
              </MenuVertical.Item>
              <MenuVertical.Item>
                <a href="#">Rönnbackens förskola - Ur och skur</a>
              </MenuVertical.Item>
              <MenuVertical.Item>
                <a href="#">Strandgårdens förskola</a>
              </MenuVertical.Item>
              <MenuVertical.Item>
                <a href="#">Vibacke förskola</a>
              </MenuVertical.Item>
              <MenuVertical.Item>
                <a href="#">Äppellunda förskola</a>
              </MenuVertical.Item>
            </MenuVertical>
          </MenuVertical.Item>
          <MenuVertical.Item>
            <MenuVertical {...args}>
              <MenuVertical.SubmenuButton>Alnö2</MenuVertical.SubmenuButton>
              <MenuVertical.Item>
                <a href="#">Fyrens förskola</a>
              </MenuVertical.Item>
              <MenuVertical.Item>
                <a href="#">Lanternans förskola</a>
              </MenuVertical.Item>
              <MenuVertical.Item>
                <MenuVertical {...args}>
                  <MenuVertical.SubmenuButton>_test</MenuVertical.SubmenuButton>
                  <MenuVertical.Item>
                    <a href="#">test</a>
                  </MenuVertical.Item>
                  <MenuVertical.Item current>
                    <a href="#">test1</a>
                  </MenuVertical.Item>
                  <MenuVertical.Item>
                    <a href="#">test2</a>
                  </MenuVertical.Item>
                </MenuVertical>
              </MenuVertical.Item>
            </MenuVertical>
          </MenuVertical.Item>
        </MenuVertical>
      </MenuVertical.Nav>
    </div>
  );
};

Template.storyName = 'MenuVertical';
