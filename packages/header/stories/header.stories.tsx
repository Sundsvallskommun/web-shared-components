import React from "react";
import { Story, Meta } from "@storybook/react";
import { Header } from "../src";

export default {
  title: "WIP/Komponenter/Header",
  component: Header,
  parameters: { controls: { hideNoControlsWarning: true } },
} as Meta;

export const Template = ({ ...args }: any) => {
  return (
    <Header {...args}></Header>
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
  },
  color: {
    type: { name: "string", required: false },
    description: "Sets color",
    table: {
      defaultValue: { summary: "primary" },
    },
    options: ["primary", "secondary", "none"],
    control: "select",
    defaultValue: "primary",
  },
  className: {
    type: { name: "string", required: false },
    description: "Sets className",
    table: {
      defaultValue: { summary: "" },
    },
    control: "text",
    defaultValue: "",
  },
  userMenu: {
    type: { required: false },
    description: "ReactNode",
    table: {
      defaultValue: { summary: 'undefined' },
    },
    defaultValue: undefined,
  },
  notificationsAlert: {
    type: { required: false },
    description: "ReactNode",
    table: {
      defaultValue: { summary: 'undefined' },
    },
    defaultValue: undefined,
  },
  LogoLinkWrapperComponent: {
    type: { required: false },
    description: "ReactNode, for wrapping the logo-link with e.g. Next/Link",
    table: {
      defaultValue: { summary: 'undefined' },
    },
    defaultValue: undefined,
  },
};

Template.storyName = "Komponent";