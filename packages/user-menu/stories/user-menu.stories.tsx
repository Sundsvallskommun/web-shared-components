import React from "react";
import { Story, Meta } from "@storybook/react";
import { UserMenu } from "../src";
import { Announcement } from "./announcement";

export default {
  title: "Komponenter/UserMenu",
  component: UserMenu,
  argTypes: {
    menuTitle: { control: "text", defaultValue: "Menytext" },
  },
  parameters: { controls: { hideNoControlsWarning: true } },
} as Meta;

export const basic = ({ text, ...args }: any) => (
  // <div className="flex flex-col items-start space-y-2 bg-gray-200">
  <div className="drop-shadow-md fixed flex items-center justify-end bg-white h-36 w-3/4">
    <UserMenu
      {...args}
      menuTitle="Företagsbolaget AB"
      menuSubTitle="Namn Efternamn"
    ></UserMenu>
  </div>
);
