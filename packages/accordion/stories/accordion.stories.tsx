import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Accordion } from "../src";

import accordionMdx from './accordion.stories.mdx';

const docPage = () => accordionMdx?.parameters?.docs?.page();

export default {
  title: "Komponenter/Accordions",
  component: Accordion,
  argTypes: {
    text: { control: 'text', defaultValue: 'lorem ipsum' },
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      page: docPage,
    },
  },
} as Meta;

export const Accordions = ({ text, ...args }: any) => (
  <div className="flex flex-col space-y-2">
    <Accordion {...args} accordionTitle="hello world">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis eveniet tempora, debitis a obcaecati accusantium fuga dolore ex veniam quos!</p>
      <p>För att kunna konsumera ett API behöver ni registrera er och få en API-nyckel, detta för att vi ska kunna tillgodogöra oss alla fördelar vårt verktygsstöd för API-hantering levererar, men även för att ge oss möjligheten att uppdatera er klienter med förändringar gällande de APIer ni konsumerar.</p>
    </Accordion>
    <Accordion {...args} accordionTitle="hello world">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis eveniet tempora, debitis a obcaecati accusantium fuga dolore ex veniam quos!</p>
    </Accordion>
    <Accordion {...args} accordionTitle="hello world">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis eveniet tempora, debitis a obcaecati accusantium fuga dolore ex veniam quos!</p>
    </Accordion>
  </div>
);
