import { FormControl, FormLabel, Input, FormErrorMessage, FormControlProps, FormHelperText } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/Formulär/FormControl',
  component: FormControl,
  tags: ['autodocs'],
} as Meta;

export const Template = (args: FormControlProps) => {
  return (
    <div className="flex flex-col gap-16">
      <p>
        Använd FormControl för att skapa och hantera ett FormContext. FormHelperText kan användas tillsammans med
        respektive fält för att till exempel beskriva vad användaren förväntas ange för information och i vilket format.
      </p>

      <FormControl {...args} id="firstname">
        <FormLabel>Personnummer</FormLabel>
        <Input placeholder="190101011234" />
        <FormHelperText>Ange personnumret i formatet ååååmmddxxxx.</FormHelperText>
      </FormControl>
    </div>
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
    <p>Formulärfält kan användas tillsammans med FormErrorMessage för att beskriva valideringsfel.</p>

    <FormControl invalid aria-invalid id="first-name">
      <FormLabel>Förnamn</FormLabel>
      <Input placeholder="Förnamn" aria-describedby="first-name-error" />
      <FormErrorMessage>Förnamn måste vara ifyllt!</FormErrorMessage>
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
