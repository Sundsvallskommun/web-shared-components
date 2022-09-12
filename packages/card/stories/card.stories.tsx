import { Card, CardList, CardBody, CardImage, CardLink, CardProps } from '../src';

import PlaceholderImage from '../../../.storybook/public/placeholder_2.png';

export default {
  title: 'Komponenter/Kort/Komponent',
  component: Card,
  parameters: {
    // controls: { hideNoControlsWarning: true },
  },
};

export const Template = (args: CardProps) => (
  <>
    <CardList>
      <Card {...args} className="text-center">
        <CardBody>
          <span className="avatar material-icons">person</span>
          <h6 className="my-6">1. Skapa ett konto</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora necessitatibus illum doloremque nihil
            consequatur totam.
          </p>
        </CardBody>
      </Card>
      <Card {...args} className="text-center">
        <CardBody>
          <span className="avatar material-icons-outlined">assignment</span>
          <h6 className="my-6">2. API-dokumentation</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora necessitatibus illum doloremque nihil
            consequatur totam.
          </p>
        </CardBody>
      </Card>
      <Card {...args} className="text-center">
        <CardBody>
          <span className="avatar material-icons">phonelink</span>
          <h6 className="my-6">3. Kom igång</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora necessitatibus illum doloremque nihil
            consequatur totam.
          </p>
        </CardBody>
      </Card>
      <Card {...args} className="text-center">
        <CardBody>
          <span className="avatar material-icons">person</span>
          <h6 className="my-6">4. Lorem ipsum</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora necessitatibus illum doloremque nihil
            consequatur totam.
          </p>
        </CardBody>
      </Card>
    </CardList>

    <CardList className="pt-24">
      <Card {...args}>
        <CardImage className="h-80" src={PlaceholderImage} alt="placeholder" />
        <CardBody>
          <h4>Lorem ipsum dolor sit amet.</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos soluta eligendi libero? Illo odio, sint
            accusamus deserunt distinctio commodi suscipit.
          </p>
        </CardBody>
      </Card>
      <Card {...args}>
        <CardImage className="h-80" src={PlaceholderImage} alt="placeholder" />
        <CardBody>
          <h4>Lorem ipsum dolor sit amet.</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos soluta eligendi libero? Illo odio, sint
            accusamus deserunt distinctio commodi suscipit.
          </p>
        </CardBody>
      </Card>
      <Card {...args}>
        <CardImage className="h-80" src={PlaceholderImage} alt="placeholder" />
        <CardBody>
          <h4>
            <CardLink href="https://example.com" external={true}>
              Lorem ipsum dolor sit.
            </CardLink>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos soluta eligendi libero? Illo odio, sint
            accusamus deserunt distinctio commodi suscipit.
          </p>
        </CardBody>
      </Card>
    </CardList>
  </>
);

Template.argTypes = {
  clickable: {
    type: { name: 'boolean', required: false },
    description: 'If the card should be clickable, will apply :hover style',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
  borderTop: {
    type: { name: 'boolean', required: false },
    description: 'Applies border top',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
  outlined: {
    type: { name: 'boolean', required: false },
    description: 'Applies border',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
};

Template.storyName = 'Komponent';
