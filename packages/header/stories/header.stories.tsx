import React from "react";
import { Story, Meta } from "@storybook/react";
import { Header } from "../src";

export default {
  title: "WIP/Komponenter/Header",
  component: Header,
  parameters: { controls: { hideNoControlsWarning: true } },
} as Meta;

export const Template = ({ title, ...args }: any) => {
  return (
    <Header title={title}>CONTENT</Header>
  )
}

Template.argTypes = {
  title: {
    type: { name: "string", required: false },
    description: "Sets title text",
    control: "text",
    table: {
      defaultValue: { summary: "" },
    },
    defaultValue: "Mina sidor",
  }
};

Template.storyName = "Komponent";