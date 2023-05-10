import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';

export interface FooterProps extends DefaultProps {
  /* Main color */
  color?: string;
  /* React node */
  children?: React.ReactNode;
  /* Section of links in the bottom node */
  bottomLinks?: React.ReactNode;
  /* Bottom links color */
  bottomLinksColor?: string;
  /* Bottom links container classes */
  bottomLinksClasses?: string;
  /* CSS-classes for top parent node */
  wrapperClasses?: string;
}

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>((props, ref) => {
  const {
    color = 'primary',
    bottomLinksColor = 'gray-middle',
    className,
    children,
    bottomLinks,
    bottomLinksClasses,
    wrapperClasses,
    ...rest
  } = props;

  return (
    <footer ref={ref} className={cx('footer', wrapperClasses)} {...rest}>
      <div data-color={color} className="footer-innerwrapper">
        <div className={cx(className, 'footer-content')}>{children}</div>
      </div>

      {bottomLinks && (
        <div className="footer-bottomlinks" data-color={bottomLinksColor}>
          <div className={cx(bottomLinksClasses, 'footer-bottomlinks-container')}>{bottomLinks}</div>
        </div>
      )}
    </footer>
  );
});

if (__DEV__) {
  Footer.displayName = 'Footer';
}

export default Footer;
