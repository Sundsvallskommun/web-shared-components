import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';
import { Logo } from './assets/logo';
import { Divider } from '@sk-web-gui/divider';

interface IHeaderLogoTextProps extends DefaultProps {
  title?: string;
  subtitle?: string;
}

export interface HeaderLogoTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'>,
    IHeaderLogoTextProps {}

export const HeaderLogoText = React.forwardRef<HTMLDivElement, IHeaderLogoTextProps>((props, ref) => {
  const { className, title, subtitle, ...rest } = props;

  return (
    <div ref={ref} {...rest} className={cx(className, 'sk-header-logotext')}>
      <div>
        <Logo />
      </div>
      <Divider orientation="vertical" className="sk-header-logotext-divider" />
      <span className="sk-header-logotext-title" id="page-title">
        {title}
        {subtitle && <span className="sk-header-logotext-subtitle">{subtitle}</span>}
      </span>
    </div>
  );
});
