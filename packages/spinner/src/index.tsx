import React from 'react';

import { Spinner as InternalSpinner, SpinnerProps as InternalSpinnerProps } from './spinner';

interface SpinnerProps
  extends InternalSpinnerProps,
    React.ForwardRefExoticComponent<InternalSpinnerProps & React.RefAttributes<HTMLInputElement>> {}

const Spinner = InternalSpinner as SpinnerProps;

export type { SpinnerProps };

export { Spinner };
export default Spinner;
