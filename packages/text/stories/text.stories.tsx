import React from 'react';
import { Text, TextProps } from '../src';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@sk-web-gui/button';
const text =
  'Hej!\n\nDenna komponent hanterar line feed (n) och carriage return (r). \nDen kan också hantera länkar; om du t.ex. skriver https://sundsvall.se, så blir den klickbar. \r\n\r\n/Utvecklingsfabriken';
export default {
  title: 'WIP/Komponenter/Text/Komponent',
  component: Text,
};

export const Template = (args: TextProps) => (
  <Text {...args}>
    <strong>Meddelande</strong>
    {text}
    <Button iconButton rounded leftIcon={<CloseIcon />} />
  </Text>
);

Template.argTypes = {
  urlAsLink: {
    type: { name: 'boolean', required: false },
    description: 'If urls should be clickable links',
    table: {
      defaultValue: { summary: 'true' },
    },
    control: 'boolean',
    defaultValue: true,
  },
  externalLinks: {
    type: { name: 'boolean', required: false },
    description: 'If links should be external',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
};

Template.storyName = 'Text';
