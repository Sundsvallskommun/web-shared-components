import React from 'react';
import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, FormControlProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Textfält/FormControl',
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

export const Outline = () => (
  <>
    <FormControl id="email">
      <FormLabel>
        <strong>E-Post</strong>
      </FormLabel>
      <Input placeholder="mail@example.com" />
      <FormHelperText>Hjälptext, Lorem ipsum dolor sit amet..</FormHelperText>
    </FormControl>
    <FormControl id="firstname">
      <FormLabel>
        <strong>Förnamn</strong>
      </FormLabel>
      <Input placeholder="Leif" />
    </FormControl>
    <FormControl id="disabled" disabled>
      <FormLabel>
        <strong>Disabled</strong>
      </FormLabel>
      <Input placeholder="Disabled" />
    </FormControl>
  </>
);

export const Solid = () => (
  <>
    <FormControl id="email">
      <FormLabel>
        <strong>E-Post</strong>
      </FormLabel>
      <Input placeholder="mail@example.com" />
      <FormHelperText>Hjälptext, Lorem ipsum dolor sit amet..</FormHelperText>
    </FormControl>
    <FormControl id="firstname">
      <FormLabel>
        <strong>Förnamn</strong>
      </FormLabel>
      <Input placeholder="Leif" />
    </FormControl>
    <FormControl disabled aria-disabled id="disabled">
      <FormLabel>
        <strong>Disabled</strong>
      </FormLabel>
      <Input placeholder="Disabled" />
    </FormControl>
  </>
);

export const Storlekar = () => (
  <>
    <h6>Small</h6>
    <FormControl id="firstname" size="sm">
      <FormLabel>Förnamn</FormLabel>
      <Input placeholder="Leif" />
    </FormControl>

    <h6>medium</h6>
    <FormControl id="firstname_md">
      <FormLabel>Förnamn</FormLabel>
      <Input placeholder="Leif" />
    </FormControl>

    <h6>Large</h6>
    <FormControl id="firstname_lg" size="lg">
      <FormLabel>Förnamn</FormLabel>
      <Input placeholder="Leif" />
    </FormControl>
  </>
);

export const Invaliderad = () => (
  <>
    <FormControl invalid aria-invalid id="first-name" required>
      <Input placeholder="Förnamn *" aria-describedby="first-name-error" />
      <FormErrorMessage>Förnamn måste vara ifylld!</FormErrorMessage>
    </FormControl>
    <FormControl invalid aria-invalid id="first-name" required>
      <Input placeholder="Förnamn *" aria-describedby="first-name-error" />
      <FormErrorMessage>Förnamn måste vara ifylld!</FormErrorMessage>
    </FormControl>
  </>
);

export const Obligatorisk = () => (
  <FormControl id="first-name" required>
    <FormLabel>First name</FormLabel>
    <Input placeholder="Enter your first name." aria-describedby="first-name-error" />
    <FormErrorMessage>First name is required!</FormErrorMessage>
  </FormControl>
);
