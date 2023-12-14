import { Meta } from '@storybook/react';
import React from 'react';
import { MenuVertical, MenuVerticalProps } from '../src';
import { MenuIndex } from '../src/menu-vertical-context';
import { Icon } from '@sk-web-gui/icon';
import { Avatar } from '@sk-web-gui/avatar';
import { Header } from '@sk-web-gui/header';

export default {
  title: 'Komponenter/Sidebar',
  component: MenuVertical,
  tags: ['autodocs'],
} as Meta<typeof MenuVertical>;

export const Template = (args: MenuVerticalProps) => {
  const [current, setCurrent] = React.useState<MenuIndex>(1001);

  const handleSetCurrent = (menuIndex: React.SetStateAction<MenuIndex>) => {
    console.log('handleSetCurrent menuIndex', menuIndex);
    setCurrent(menuIndex);
  };

  return (
    <div className="w-[36.8rem]">
      <MenuVertical.Provider current={current} setCurrent={handleSetCurrent}>
        {({ setCurrentActiveFocus }) => (
          <MenuVertical.Sidebar>
            <MenuVertical.Header>
              <a href="#">
                <Header.LogoText title="Service name" subtitle="Subheader" />
              </a>
            </MenuVertical.Header>
            <MenuVertical {...args}>
              <MenuVertical.Item>
                <a href="#">
                  <MenuVertical.ToolItem>
                    <Avatar />
                    <span>ToolItem</span>
                  </MenuVertical.ToolItem>
                </a>
              </MenuVertical.Item>
              <MenuVertical.Item disabled>
                <a href="#">Disabled</a>
              </MenuVertical.Item>
              <MenuVertical.Item>
                <button onClick={() => setCurrentActiveFocus(1002)}>Set nested current item</button>
              </MenuVertical.Item>
              <MenuVertical.Item>
                <MenuVertical {...args}>
                  <MenuVertical.SubmenuButton>
                    <a href="#">
                      <Icon name="arrow-right-circle" />
                      <span>N1 - Subitem (a-tag)</span>
                    </a>
                  </MenuVertical.SubmenuButton>
                  <MenuVertical.Item>
                    <a href="#">Fyrens förskola</a>
                  </MenuVertical.Item>
                  <MenuVertical.Item>
                    <a href="#">Lanternans förskola</a>
                  </MenuVertical.Item>
                  <MenuVertical.Item>
                    <a href="#">Rönnbackens förskola - Ur och skur</a>
                  </MenuVertical.Item>
                  <MenuVertical.Item menuIndex="apa">
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
                  <MenuVertical.SubmenuButton>
                    <button>
                      <Icon name="arrow-right-circle" />
                      <span>N1 - Subitem</span>
                    </button>
                  </MenuVertical.SubmenuButton>
                  <MenuVertical.Item>
                    <a href="#">Fyrens förskola</a>
                  </MenuVertical.Item>
                  <MenuVertical.Item>
                    <a href="#">Lanternans förskola</a>
                  </MenuVertical.Item>
                  <MenuVertical.Item>
                    <MenuVertical {...args}>
                      <MenuVertical.SubmenuButton>N2 - Subitem</MenuVertical.SubmenuButton>
                      <MenuVertical.Item>
                        <a href="#">test</a>
                      </MenuVertical.Item>
                      <MenuVertical.Item menuIndex={1001}>
                        <a href="#">test1</a>
                      </MenuVertical.Item>
                      <MenuVertical.Item>
                        <MenuVertical {...args}>
                          <MenuVertical.SubmenuButton>N3 - Subitem</MenuVertical.SubmenuButton>
                          <MenuVertical.Item menuIndex={1002}>
                            <a href="#">test</a>
                          </MenuVertical.Item>
                          <MenuVertical.Item>
                            <a href="#">test1</a>
                          </MenuVertical.Item>
                          <MenuVertical.Item>
                            <MenuVertical {...args}>
                              <MenuVertical.SubmenuButton>N4 - Subitem</MenuVertical.SubmenuButton>
                              <MenuVertical.Item>
                                <a href="#">test</a>
                              </MenuVertical.Item>
                              <MenuVertical.Item>
                                <a href="#">test1</a>
                              </MenuVertical.Item>
                              <MenuVertical.Item>
                                <MenuVertical {...args}>
                                  <MenuVertical.SubmenuButton disabled>
                                    N5 - Subitem (disabled)
                                  </MenuVertical.SubmenuButton>
                                  <MenuVertical.Item>
                                    <a href="#">test</a>
                                  </MenuVertical.Item>
                                  <MenuVertical.Item>
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
                      </MenuVertical.Item>
                    </MenuVertical>
                  </MenuVertical.Item>
                  <MenuVertical.Item>
                    <MenuVertical {...args}>
                      <MenuVertical.SubmenuButton>N2 - Subitem - Sibling 1</MenuVertical.SubmenuButton>
                      <MenuVertical.Item>
                        <a href="#">test</a>
                      </MenuVertical.Item>
                      <MenuVertical.Item>
                        <a href="#">test1</a>
                      </MenuVertical.Item>
                      <MenuVertical.Item>
                        <a href="#">test2</a>
                      </MenuVertical.Item>
                    </MenuVertical>
                  </MenuVertical.Item>
                  <MenuVertical.Item>
                    <MenuVertical {...args}>
                      <MenuVertical.SubmenuButton disabled>N2 - Subitem - Sibling 2</MenuVertical.SubmenuButton>
                      <MenuVertical.Item>
                        <a href="#">test</a>
                      </MenuVertical.Item>
                      <MenuVertical.Item>
                        <a href="#">test1</a>
                      </MenuVertical.Item>
                      <MenuVertical.Item>
                        <a href="#">test2</a>
                      </MenuVertical.Item>
                    </MenuVertical>
                  </MenuVertical.Item>
                </MenuVertical>
              </MenuVertical.Item>
              <MenuVertical.Item>
                <MenuVertical {...args}>
                  <MenuVertical.SubmenuButton disabled>
                    <a href="#">
                      <Icon name="arrow-right-circle" />
                      <span>N1 - Subitem 2</span>
                    </a>
                  </MenuVertical.SubmenuButton>
                  <MenuVertical.Item>
                    <a href="#">test</a>
                  </MenuVertical.Item>
                </MenuVertical>
              </MenuVertical.Item>
            </MenuVertical>
          </MenuVertical.Sidebar>
        )}
      </MenuVertical.Provider>
    </div>
  );
};

Template.storyName = 'MenuVertical';
