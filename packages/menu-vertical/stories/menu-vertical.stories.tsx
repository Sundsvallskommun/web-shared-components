import { Meta } from '@storybook/react';
import React from 'react';
import { MenuIndex, MenuVertical, MenuVerticalProps } from '../src';

export default {
  title: 'Komponenter/Menu-vertical',
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
    <div className="w-[30.2rem]">
      <MenuVertical.Provider current={current} menuAriaLabel="Områden" setCurrent={handleSetCurrent}>
        {({ setCurrentActiveFocus }) => (
          <MenuVertical.Nav>
            <MenuVertical.BackButton>Kommunala förskolor</MenuVertical.BackButton>
            <MenuVertical.Label>Områden</MenuVertical.Label>

            <MenuVertical {...args}>
              <MenuVertical.Item disabled>
                <a href="#">Disabled</a>
              </MenuVertical.Item>
              <MenuVertical.Item>
                <button onClick={() => setCurrentActiveFocus(1002)}>Set nested current item</button>
              </MenuVertical.Item>
              <MenuVertical.Item role="separator" />
              <MenuVertical.Item>
                <MenuVertical {...args}>
                  <MenuVertical.SubmenuButton>
                    <a href="#">N1 - Subitem (a-tag)</a>
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
                  <MenuVertical.SubmenuButton>N1 - Subitem</MenuVertical.SubmenuButton>
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
                </MenuVertical>
              </MenuVertical.Item>
            </MenuVertical>
          </MenuVertical.Nav>
        )}
      </MenuVertical.Provider>
    </div>
  );
};

Template.storyName = 'MenuVertical';
