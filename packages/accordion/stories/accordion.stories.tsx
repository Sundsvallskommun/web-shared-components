import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { Accordion, AccordionProps } from '../src';
import { Button, cx, FormControl, FormLabel, Select } from '@sk-web-gui/react';

export default {
  title: 'Komponenter/Accordions/Komponent',
  component: Accordion,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} as Meta;

export const Template = (args: AccordionProps) => {
  const [extraContent, setExtraContent] = useState(false);
  const [extraExtraContent, setExtraExtraContent] = useState(false);

  return (
    <>
      <Accordion {...args}>
        <h4>Lorem Ipsum</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero placeat eveniet quas nulla saepe minus
          recusandae quis obcaecati necessitatibus. Quidem.
        </p>
        <form>
          <FormControl id="priority">
            <FormLabel>
              <Select onChange={() => {}} placeholder="Välj">
                <option
                  className={cx(
                    `cursor-pointer select-none relative py-4 pl-10 pr-4
                              `
                  )}
                  value="1"
                >
                  Först
                </option>
                <option
                  className={cx(
                    `cursor-pointer select-none relative py-4 pl-10 pr-4
                              `
                  )}
                  value="1"
                >
                  Andra
                </option>
                <option
                  className={cx(
                    `cursor-pointer select-none relative py-4 pl-10 pr-4
                              `
                  )}
                  value="1"
                >
                  Andra
                </option>
                <option
                  className={cx(
                    `cursor-pointer select-none relative py-4 pl-10 pr-4
                              `
                  )}
                  value="1"
                >
                  Andra
                </option>
                <option
                  className={cx(
                    `cursor-pointer select-none relative py-4 pl-10 pr-4
                              `
                  )}
                  value="1"
                >
                  Andra
                </option>
              </Select>
            </FormLabel>
          </FormControl>
        </form>
        <Button
          onClick={() => {
            setExtraContent(!extraContent);
          }}
        >
          Utökat innehåll
        </Button>
        {extraContent && (
          <>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam pariatur perspiciatis molestiae
              itaque, nulla illo quam, provident ex reprehenderit veniam in consectetur debitis maiores sapiente
              consequuntur fugiat voluptatem. Fugiat!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam pariatur perspiciatis molestiae
              itaque, nulla illo quam, provident ex reprehenderit veniam in consectetur debitis maiores sapiente
              consequuntur fugiat voluptatem. Fugiat!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam pariatur perspiciatis molestiae
              itaque, nulla illo quam, provident ex reprehenderit veniam in consectetur debitis maiores sapiente
              consequuntur fugiat voluptatem. Fugiat!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam pariatur perspiciatis molestiae
              itaque, nulla illo quam, provident ex reprehenderit veniam in consectetur debitis maiores sapiente
              consequuntur fugiat voluptatem. Fugiat!
            </p>
            <Button
              onClick={() => {
                setExtraExtraContent(!extraExtraContent);
              }}
            >
              Ännu mer utökat innehåll
            </Button>
            {extraExtraContent && (
              <>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam pariatur perspiciatis molestiae
                  itaque, nulla illo quam, provident ex reprehenderit veniam in consectetur debitis maiores sapiente
                  consequuntur fugiat voluptatem. Fugiat!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam pariatur perspiciatis molestiae
                  itaque, nulla illo quam, provident ex reprehenderit veniam in consectetur debitis maiores sapiente
                  consequuntur fugiat voluptatem. Fugiat!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam pariatur perspiciatis molestiae
                  itaque, nulla illo quam, provident ex reprehenderit veniam in consectetur debitis maiores sapiente
                  consequuntur fugiat voluptatem. Fugiat!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ullam pariatur perspiciatis molestiae
                  itaque, nulla illo quam, provident ex reprehenderit veniam in consectetur debitis maiores sapiente
                  consequuntur fugiat voluptatem. Fugiat!
                </p>
              </>
            )}
          </>
        )}
      </Accordion>
    </>
  );
};

Template.argTypes = {
  accordionTitle: { control: 'text', defaultValue: 'En vanlig fråga' },
  accordionSubTitle: { control: 'text', defaultValue: 'En vanlig underrubrik' },
  initalOpen: { control: 'boolean', defaultValue: false },
  variant: {
    type: { name: 'string', required: false },
    description: 'Sets variant',
    table: {
      defaultValue: { summary: 'solid' },
    },
    options: ['solid', 'outline', 'alert'],
    control: 'select',
    defaultValue: 'solid',
  },
  noMargin: { control: 'boolean', defaultValue: false },
  // TODO: implement disabled and color for accordions
  /* disabled: { control: 'boolean', defaultValue: false },
    color: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
      defaultValue: 'primary',
    }, */
};

Template.story = { name: 'Komponent' };
