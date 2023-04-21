import { DefaultProps } from '@sk-web-gui/utils';
import { cx, getValidChildren, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';

import { Input, InputProps } from '../input/input';
import { InputLeftElement, InputRightElement } from '../input-element';
import { InputLeftAddon, InputRightAddon } from '../input-addon';
import { useInputGroupClass } from './styles';

interface IInputGroupProps extends DefaultProps {
  /* Size of all wrapped input */
  size?: InputProps['size'];
  /* React node */
  children?: React.ReactNode;
  /* Makes input invalid */
  invalid?: boolean;
  rounded?: boolean;
}

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement>, IInputGroupProps {}

const inputSizes: { [key: string]: string } = {
  xl: '12',
  lg: '10',
  md: '8',
  sm: '7',
  xs: '6',
};

const plSizes: { [key: string]: string } = {
  12: 'pl-12',
  10: 'pl-10',
  8: 'pl-8',
  7: 'pl-7',
  6: 'pl-6',
};

const prSizes: { [key: string]: string } = {
  12: 'pr-12',
  10: 'pr-10',
  8: 'pr-8',
  7: 'pr-7',
  6: 'pr-6',
};

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>((props, ref) => {
  const { children, className, size = 'md', invalid, rounded, ...rest } = props;
  const classes = useInputGroupClass({ size });
  const height = inputSizes[size];
  let pl: string | undefined;
  let pr: string | undefined;

  let rl: string | undefined;
  let rr: string | undefined;

  const validChildren = getValidChildren(children);

  validChildren.forEach((child) => {
    if (child.type === InputLeftElement) {
      pl = plSizes[height];
    }
    if (child.type === InputRightElement) {
      pr = prSizes[height];
    }

    if (child.type === InputLeftAddon) {
      rl = 'rounded-l-none';
    }
    if (child.type === InputRightAddon) {
      rr = 'rounded-r-none';
    }
  });

  return (
    <div
      ref={ref}
      role="group"
      aria-invalid={invalid}
      data-rounded={rounded ? rounded : undefined}
      className={cx('form-input-group', classes, className)}
      {...rest}
    >
      {validChildren.map((child) => {
        if (child.type === Input) {
          return React.cloneElement(child, {
            size,
            className: cx(pl, pr, rl, rr, child.props.className),
          });
        }
        return React.cloneElement(child, { size });
      })}
    </div>
  );
});

if (__DEV__) {
  InputGroup.displayName = 'InputGroup';
}

export default InputGroup;
