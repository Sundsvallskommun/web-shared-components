import React from 'react';
import { Input, InputProps } from '../input/input';

export interface DatePickerProps extends Omit<InputProps, 'type' | 'as'> {
  type?: 'date' | 'time' | 'datetime-local';
}

/**
 * Without an upper bound the browser's native year field accepts up to six
 * digits (the largest valid year is 275760), so continued typing overflows the
 * year into e.g. "20000" instead of moving on to the month. Capping the year at
 * four digits also makes the field auto-advance to the next segment, letting a
 * full date be typed in one go (e.g. "20000101" -> "2000-01-01").
 */
const defaultMaxByType: Record<NonNullable<DatePickerProps['type']>, string | undefined> = {
  date: '9999-12-31',
  'datetime-local': '9999-12-31T23:59',
  time: undefined,
};

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const { type = 'date', max, ...rest } = props;
  return <Input type={type} max={max ?? defaultMaxByType[type]} ref={ref} {...rest} />;
});

export default DatePicker;
