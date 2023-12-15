import React from 'react';
import { Input, InputProps } from '../input/input';

export interface DatePickerProps extends Omit<InputProps, 'type' | 'as'> {
  type?: 'date' | 'time' | 'datetime-local';
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>((props, ref) => {
  const { type = 'date', ...rest } = props;
  return <Input type={type} ref={ref} {...rest} />;
});

export default DatePicker;
