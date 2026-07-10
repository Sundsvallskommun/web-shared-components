import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { useForm } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '../src/date-picker/date-picker';

const DEFAULT_MAX_SUMMARY =
  'date → 9999-12-31 | datetime-local → 9999-12-31T23:59 | time → none';

const meta = {
  title: 'Komponenter/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  args: {
    type: 'date',
    'aria-label': 'Välj datum',
  },
  argTypes: {
    type: {
      description: 'Input type',
      table: {
        defaultValue: { summary: 'date' },
      },
      options: ['date', 'time', 'datetime-local'],
      control: 'select',
    },
    max: {
      description:
        'Latest selectable value. When omitted, DatePicker applies a type-specific four-digit year cap for date and datetime-local, and no default for time.',
      table: {
        defaultValue: { summary: DEFAULT_MAX_SUMMARY },
      },
      control: 'text',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const sizes = ['sm', 'md', 'lg'] as const;

const DatePickerSizes = ({
  label,
  type = 'date',
  max,
}: {
  label: string;
  type?: DatePickerProps['type'];
  max?: DatePickerProps['max'];
}) => (
  <div className="flex flex-col gap-16">
    <div className="flex gap-16">
      {sizes.map((size) => (
        <DatePicker key={size} size={size} type={type} max={max} aria-label={label} />
      ))}
    </div>
  </div>
);

const expectRenderedMax = async (
  canvasElement: HTMLElement,
  label: string,
  expectedMax: string | undefined,
  expectedCount = sizes.length
) => {
  const inputs = within(canvasElement).getAllByLabelText(label);

  await expect(inputs).toHaveLength(expectedCount);

  for (const input of inputs) {
    if (expectedMax) {
      await expect(input).toHaveAttribute('max', expectedMax);
    } else {
      await expect(input).not.toHaveAttribute('max');
    }
  }
};

export const Template: Story = {
  name: 'DatePicker',
};

export const Disabled: Story = {
  name: 'Inaktiverad',
  args: {
    disabled: true,
  },
};

export const Invalid: Story = {
  name: 'Invaliderad',
  args: {
    invalid: true,
  },
};

export const Storlekar: Story = {
  render: () => <DatePickerSizes label="Välj datum" />,
};

export const Datum: Story = {
  render: () => <DatePickerSizes label="Välj datum" type="date" />,
  play: async ({ canvasElement }) => {
    await expectRenderedMax(canvasElement, 'Välj datum', '9999-12-31');
  },
};

export const Tid: Story = {
  render: () => <DatePickerSizes label="Välj tid" type="time" />,
  play: async ({ canvasElement }) => {
    await expectRenderedMax(canvasElement, 'Välj tid', undefined);
  },
};

export const DatumTid: Story = {
  render: () => <DatePickerSizes label="Välj datum och tid" type="datetime-local" />,
  play: async ({ canvasElement }) => {
    await expectRenderedMax(canvasElement, 'Välj datum och tid', '9999-12-31T23:59');
  },
};

export const AnpassadMaxgrans: Story = {
  name: 'Anpassad maxgräns',
  args: {
    max: '2026-12-31',
    'aria-label': 'Välj datum med anpassad maxgräns',
  },
  play: async ({ canvasElement }) => {
    await expectRenderedMax(canvasElement, 'Välj datum med anpassad maxgräns', '2026-12-31', 1);
  },
};

const DatePickerWithForm = () => {
  const { register, watch } = useForm<{ date: string }>();
  const date = watch('date');

  React.useEffect(() => {
    console.log(date);
  }, [date]);

  return <DatePicker aria-label="Välj datum" {...register('date')} />;
};

export const WithForms: Story = {
  render: () => <DatePickerWithForm />,
};
