import * as React from 'react';

import {
  Tooltip as InternalTooltip,
  TooltipProps as InternalTooltipProps,

} from './tooltip';

interface TooltipProps
  extends InternalTooltipProps,
    React.ForwardRefExoticComponent<InternalTooltipProps & React.RefAttributes<HTMLElement>> {
}

const Tooltip = InternalTooltip as TooltipProps;


export type { TooltipProps };

export { Tooltip };
export default Tooltip;
