import { Button } from '@sk-web-gui/button';
import { cx } from '@sk-web-gui/utils';
import React from 'react';

type InputSectionButtonProps = React.ComponentPropsWithoutRef<typeof Button.Component>;

export const InputSectionButton = React.forwardRef<HTMLButtonElement, InputSectionButtonProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <Button
      ref={ref}
      className={cx('sk-ai-inputsection-button', className)}
      size="md"
      variant="primary"
      children="Skicka"
      type="submit"
      {...rest}
    />
  );
});
