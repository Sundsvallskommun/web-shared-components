import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import Button from '@sk-web-gui/button';
import * as React from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { useTagClass } from './styles';

export interface TagProps extends DefaultProps {
  /** Controls tag appearance */
  variant?: 'outline' | 'solid' | 'light';
  /* href for tag as a button */
  href?: string;
  /* useDeleteButton boolean */
  useDeleteButton?: boolean;
  /* Aria-label for remove button */
  deleteAriaLabel?: string;
  /* Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /* Delete callback */
  deleteCallback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /* React node */
  children?: React.ReactNode;
  /* Classnames */
  className?: string;
}

export const Tag = React.forwardRef<any, TagProps>((props, ref) => {
  const {
    children,
    variant = 'outline',
    size = 'md',
    href: href = '',
    useDeleteButton,
    deleteAriaLabel,
    deleteCallback,
    className,
    ...rest
  } = props;

  const classes = useTagClass({
    variant,
    size,
  });

  if (href) {
    return (
      <a href={href} className={cx(className, classes)} {...rest}>
        <span className="tag-text">{children}</span>
      </a>
    );
  }

  return (
    <div className={cx(className, classes)} {...rest}>
      <span className="tag-text">{children}</span>
      {useDeleteButton && (
        <Button
          size="fit"
          type="button"
          iconButton
          rounded
          onClick={deleteCallback}
          className="tag-close-button"
          aria-label={deleteAriaLabel}
        >
          <CloseOutlinedIcon className="tag-close-button-icon" aria-hidden="true" />
        </Button>
      )}
    </div>
  );
});

if (__DEV__) {
  Tag.displayName = 'Tag';
}

export default Tag;
