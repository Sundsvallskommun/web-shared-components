import { FormControl, FormLabel } from "@sk-web-gui/forms";
import { useState } from "react";
import { Pagination } from "../src";

export default {
  title: "Komponenter/Pagination/Komponent",
  component: Pagination,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const handleChange = (page: number) => {
  let pageNumber = 1;
  return pageNumber += 1;
}

export const Template = ({ ...args }: any) => <Pagination {...args} handleChange={handleChange} />;

Template.storyName = 'Komponent';

Template.argTypes = {
  pages: {
    type: { name: 'string', required: true },
    description: 'Sets total pages',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'number',
    defaultValue: 11,
  },
  handleChange: {
    type: { name: 'function', required: true },
    description: 'Sets page number from parent',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'function',
    defaultValue: false,
  },
  size: {
    type: { name: "string", required: false },
    description: "Sets size",
    table: {
      defaultValue: { summary: "md" },
    },
    options: ["sm", "md", "lg"],
    control: "select",
    defaultValue: "md",
  },
};