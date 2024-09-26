import { Icon } from '@sk-web-gui/icon';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface BubbleProps extends React.ComponentPropsWithoutRef<'button'> {
  /**
   * @default vattjom
   */
  color?: string;
}

export const Bubble = React.forwardRef<HTMLButtonElement, BubbleProps>((props, ref) => {
  const { className, children, color = 'vattjom', ...rest } = props;

  return (
    <button ref={ref} className={cx('sk-ai-bubble', className)} data-color={color} {...rest}>
      {children}
      <Icon icon={<ArrowRight />} size={18} />
      <span className="sk-ai-bubble-tail" />
    </button>
  );
});
