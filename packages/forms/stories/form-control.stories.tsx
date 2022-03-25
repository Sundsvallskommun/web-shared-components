import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage } from "../src";

export default {
  title: "Komponenter/Textfält/Komponent",
  component: FormControl,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const outline = () => (
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
      <Input placeholder="Disabled"/>
    </FormControl>    
  </>
);

export const solid = () => (
  <>
    <FormControl id="email">
      <FormLabel>
        <strong>E-Post</strong>
      </FormLabel>
      <Input variant="solid" placeholder="mail@example.com" />
      <FormHelperText>Hjälptext, Lorem ipsum dolor sit amet..</FormHelperText>
    </FormControl>
    <FormControl id="firstname">
      <FormLabel>
        <strong>Förnamn</strong>
      </FormLabel>
      <Input variant="solid" placeholder="Leif" />
    </FormControl>
    <FormControl disabled aria-disabled id="disabled">
      <FormLabel>
        <strong>Disabled</strong>
      </FormLabel>
      <Input variant="solid" placeholder="Disabled" />
    </FormControl>
  </>
);

export const Storlekar = () => (
  <>
    <h6>Small</h6>
    <FormControl id="firstname">
      <FormLabel>
        <strong>Förnamn</strong>
      </FormLabel>
      <Input size="sm" variant="outline" placeholder="Leif" />
    </FormControl>

    <h6>medium</h6>
    <FormControl id="firstname_md">
      <FormLabel>
        <strong>Förnamn</strong>
      </FormLabel>
      <Input variant="outline" placeholder="Leif" />
    </FormControl>

    <h6>Large</h6>
    <FormControl id="firstname_lg">
      <FormLabel>
        <strong>Förnamn</strong>
      </FormLabel>
      <Input size="lg" variant="outline" placeholder="Leif" />
    </FormControl>
  </>
);

export const invalid = () => (
  <>
    <FormControl invalid aria-invalid id="first-name" required>
      <Input placeholder="Förnamn *" aria-describedby="first-name-error" />
      <FormErrorMessage>Förnamn måste vara ifylld!</FormErrorMessage>
    </FormControl>
    <FormControl invalid aria-invalid id="first-name" required>
      <Input variant="solid" placeholder="Förnamn *" aria-describedby="first-name-error" />
      <FormErrorMessage>Förnamn måste vara ifylld!</FormErrorMessage>
    </FormControl>
  </>
);

export const required = () => (
  <FormControl id="first-name" required>
    <FormLabel>
      First name
    </FormLabel>
    <Input placeholder="Enter your first name." aria-describedby="first-name-error" />
    <FormErrorMessage>First name is required!</FormErrorMessage>
  </FormControl>
);
