import React, { useState } from 'react';
import { Tabs, TabsProps } from '../src';
import { Meta } from '@storybook/react';
import { Pagination } from '@sk-web-gui/pagination';
import londonSrc from './images/london.jpg';
import parisSrc from './images/paris.jpg';
import tokyoSrc from './images/tokyo.jpg';

export default {
  title: 'Komponenter/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} as Meta<typeof Tabs>;

export const Template = (args: TabsProps) => {
  return (
    <Tabs {...args} onTabChange={(panel) => console.log('Showing panel', panel)}>
      <Tabs.Item>
        <Tabs.Button>London</Tabs.Button>
        <Tabs.Content>
          <p>London is the capital city of England.</p>
        </Tabs.Content>
      </Tabs.Item>
      <Tabs.Item>
        <Tabs.Button>Paris</Tabs.Button>
        <Tabs.Content>
          <p>Paris is the capital of France.</p>
        </Tabs.Content>
      </Tabs.Item>
      <Tabs.Item>
        <Tabs.Button>Tokyo</Tabs.Button>
        <Tabs.Content>
          <p>Tokyo is the capital of Japan.</p>
        </Tabs.Content>
      </Tabs.Item>
    </Tabs>
  );
};

Template.storyName = 'Tabs';

export const StateControlled = () => {
  const [current, setCurrent] = React.useState<number>(0);
  return (
    <div>
      <Tabs current={current} showBackground color="vattjom">
        <Tabs.Item>
          <Tabs.Button onClick={() => setCurrent(0)}>Tab 1</Tabs.Button>
          <Tabs.Content>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo lorem ac leo vehicula, in
              convallis nisl dapibus. Maecenas et arcu a dui commodo molestie. Etiam id ipsum cursus, gravida velit in,
              feugiat tellus.
            </p>
          </Tabs.Content>
        </Tabs.Item>
        <Tabs.Item>
          <Tabs.Button onClick={() => setCurrent(1)}>Tab 2</Tabs.Button>
          <Tabs.Content>
            <p>
              Aenean sagittis commodo metus. Integer ac velit cursus, volutpat arcu nec, vulputate lacus. Donec eu magna
              hendrerit, feugiat lacus sed, euismod ex. Integer ligula nulla, pharetra a felis non, finibus cursus odio.
            </p>
          </Tabs.Content>
        </Tabs.Item>
      </Tabs>
      <Pagination pages={2} activePage={current + 1} changePage={(page) => setCurrent(page - 1)} />
    </div>
  );
};

export const ControlOthers = () => {
  const images = [londonSrc, parisSrc, tokyoSrc];
  const [imageSrc, setImageSrc] = useState<string>(images[0]);

  return (
    <div className="flex gap-32">
      <div className="w-2/3">
        <Tabs onTabChange={(panel) => setImageSrc(images[panel])} showBackground color="juniskar">
          <Tabs.Item>
            <Tabs.Button>London</Tabs.Button>
            <Tabs.Content>
              <p>London is the capital city of England.</p>
            </Tabs.Content>
          </Tabs.Item>
          <Tabs.Item>
            <Tabs.Button>Paris</Tabs.Button>
            <Tabs.Content>
              <p>Paris is the capital of France.</p>
            </Tabs.Content>
          </Tabs.Item>
          <Tabs.Item>
            <Tabs.Button>Tokyo</Tabs.Button>
            <Tabs.Content>
              <p>Tokyo is the capital of Japan.</p>
            </Tabs.Content>
          </Tabs.Item>
        </Tabs>
      </div>
      <div className="w-1/3 max-h-[30rem] overflow-hidden">
        <img src={imageSrc} alt="" className="w-full object-cover" />
      </div>
    </div>
  );
};

ControlOthers.storyName = 'Control external elements';
Template.storyName = 'Tabs';
