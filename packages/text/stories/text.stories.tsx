import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { Meta } from '@storybook/react';
import { Text, TextProps } from '../src';
import { X } from 'lucide-react';

const text =
  'Hej!\n\nDenna komponent hanterar line feed (n) och carriage return (r). \nDen kan också hantera länkar; om du t.ex. skriver https://sundsvall.se, så blir den klickbar. \r\n\r\n/Utvecklingsfabriken';
export default {
  title: 'WIP/Komponenter/Text/Komponent',
  component: Text,
  tags: ['autodocs'],
} as Meta;

export const Template = (args: TextProps) => (
  <Text {...args}>
    <strong>Meddelande</strong>
    {text}
    <Button iconButton rounded leftIcon={<Icon icon={<X />} />} />
  </Text>
);

Template.storyName = 'Text';
