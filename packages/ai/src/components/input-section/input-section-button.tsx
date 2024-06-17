import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { cx } from '@sk-web-gui/utils';
import React from 'react';

interface InputSectionButtonProps extends React.ComponentPropsWithoutRef<typeof Button.Component> {
  isMobile?: boolean;
}

export const InputSectionButton = React.forwardRef<HTMLButtonElement, InputSectionButtonProps>((props, ref) => {
  const { className, isMobile, ...rest } = props;

  return (
    <Button
      ref={ref}
      className={cx('sk-ai-inputsection-button', className)}
      size={isMobile ? 'sm' : 'md'}
      iconButton={isMobile}
      variant="primary"
      children={isMobile ? <Icon name="send-horizontal" /> : 'Skicka'}
      aria-label={isMobile ? 'Skicka' : undefined}
      type="submit"
      {...rest}
    />
  );
});
