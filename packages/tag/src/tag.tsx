import { DefaultProps } from "@sk-web-gui/theme";
import { cx, __DEV__ } from "@sk-web-gui/utils";
import { Button } from "@sk-web-gui/button";
import * as React from "react";

import { useTagClass } from "./styles";

export interface TagProps extends DefaultProps {
  /** Controls tag appearance */
  variant?: "outline" | "solid" | "light";
  /* href for tag as a button */
  href?: string;
  /* useDeleteButton boolean */
  useDeleteButton?: boolean;
  /* Aria-label for remove button */
  deleteAriaLabel?: string;
  /* Size of the button */
  size?: "sm" | "md" | "lg";
  /* Delete callback */
  deleteCallback?: (e:  React.MouseEvent<HTMLButtonElement>) => void;
  /* React node */
  children?: React.ReactNode;
}

export const Tag = React.forwardRef<any, TagProps>((props, ref) => {
  const {
    children,
    variant = "outline",
    size = "md",
    href: href = "",
    useDeleteButton,
    deleteAriaLabel,
    deleteCallback,
    ...rest
  } = props;

  const classes = useTagClass({
    variant,
    size,
  });

  if (href) {
    return (
      <a href={href} className={cx(classes)} {...rest}>
        <span className="tag-text">{children}</span>
      </a>
    );
  }

  return (
    <div className={cx(classes)} {...rest}>
      <span className="tag-text">{children}</span>
      {useDeleteButton && (
        <Button
          type="button"
          onClick={deleteCallback}
          className="tag-close-button"
          aria-label={deleteAriaLabel}
        >
          <span
            className="tag-close-button-icon material-icons-outlined"
            aria-hidden="true"
          >
            close
          </span>
        </Button>
      )}
    </div>
  );
});

if (__DEV__) {
  Tag.displayName = "Tag";
}
