import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { InputSectionDefaultProps } from './input-section';
import { SendHorizontal } from 'lucide-react';

interface InputSectionButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button.Component>,
    Omit<InputSectionDefaultProps, 'shadow'> {}

export const InputSectionButton = React.forwardRef<HTMLButtonElement, InputSectionButtonProps>((props, ref) => {
  const { className, isMobile, variant = 'default', ...rest } = props;

  return (
    <Button
      ref={ref}
      className={cx('sk-ai-inputsection-button', className)}
      size={isMobile || variant === 'inset' ? 'sm' : 'md'}
      iconButton={isMobile}
      variant="primary"
      children={isMobile ? <Icon icon={<SendHorizontal />} /> : 'Skicka'}
      aria-label={isMobile ? 'Skicka' : undefined}
      type="submit"
      {...rest}
    />
  );
});
