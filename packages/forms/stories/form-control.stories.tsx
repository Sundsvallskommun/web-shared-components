import { FormControl, FormLabel, Input, FormErrorMessage, FormControlProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Formulär/FormControl',
  component: FormControl,
  tags: ['autodocs'],
} as Meta;

export const Template = (args: FormControlProps) => {
  return (
    <FormControl {...args} id="firstname">
      <FormLabel>Förnamn</FormLabel>
      <Input placeholder="Leif" />
    </FormControl>
  );
};

Template.storyName = 'FormControl';

export const Storlekar = () => (
  <div className="flex flex-col gap-16">
    <FormControl id="firstname" size="sm">
      <FormLabel>Förnamn</FormLabel>
      <Input placeholder="Leif" />
    </FormControl>

    <FormControl id="firstname_md">
      <FormLabel>Förnamn</FormLabel>
      <Input placeholder="Leif" />
    </FormControl>

    <FormControl id="firstname_lg" size="lg">
      <FormLabel>Förnamn</FormLabel>
      <Input placeholder="Leif" />
    </FormControl>
  </div>
);

export const Invaliderad = () => (
  <div className="flex flex-col gap-16">
    <FormControl invalid aria-invalid id="first-name" required>
      <FormLabel>Förnamn</FormLabel>
      <Input placeholder="Förnamn *" aria-describedby="first-name-error" />
      <FormErrorMessage>Förnamn måste vara ifylld!</FormErrorMessage>
    </FormControl>
    <FormControl invalid aria-invalid id="first-name" required>
      <FormLabel>Förnamn</FormLabel>
      <Input placeholder="Förnamn *" aria-describedby="first-name-error" />
      <FormErrorMessage>Förnamn måste vara ifylld!</FormErrorMessage>
    </FormControl>
  </div>
);

export const Obligatorisk = () => (
  <FormControl id="first-name" required>
    <FormLabel showRequired>First name</FormLabel>
    <Input placeholder="Enter your first name." aria-describedby="first-name-error" />
    <FormErrorMessage>First name is required!</FormErrorMessage>
  </FormControl>
);
