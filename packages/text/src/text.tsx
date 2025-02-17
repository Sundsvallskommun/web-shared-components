import { Link } from '@sk-web-gui/link';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import React from 'react';

export interface TextProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  /* If text looking like urls should be clickable links */
  urlAsLink?: boolean;
  /* If links should be external or not */
  externalLinks?: boolean;
  onLinkClick?: (event: MouseEvent, url: string) => void;
  /* React node */
  children?: React.ReactNode;
  /* The element or component to use in place of `div` */
  as?: React.ElementType;
}

export const Text = React.forwardRef<HTMLDivElement, TextProps>((props, ref) => {
  const {
    children,
    className,
    urlAsLink = true,
    externalLinks = false,
    onLinkClick,
    as: Comp = 'div',
    ...rest
  } = props;

  const handleClick = (e: MouseEvent, url: string) => {
    onLinkClick?.(e, url);
  };

  const getTextWithLinks = (text: string) => {
    const httpRegex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

    const textArray = text.replace(/(,)/g, ' ,').replace(/(!)/g, ' !').split(' ');

    const textWithLink = textArray
      .map((text) => {
        if (httpRegex.test(text)) {
          const hasDot = text.at(-1) === '.';
          const url = hasDot ? text.slice(0, -1) : text;
          return `<link><url>${url}<link>${hasDot ? '.' : ''}`;
        } else {
          return text;
        }
      })
      .filter((text) => text.length > 0)
      .join(' ')
      .replace(/( ,)/g, ',')
      .replace(/( !)/g, '!');
    return (
      <>
        {textWithLink.split('<link>').map((text, index) => {
          if (text.indexOf('<url>') === 0) {
            const url = text.split('<url>')[1];
            return (
              <Link
                key={`link-${index}`}
                external={externalLinks}
                href={url}
                target={externalLinks ? '_blank' : '_self'}
                onClick={(e: MouseEvent) => handleClick(e, url)}
              >
                {url}
              </Link>
            );
          } else {
            return text;
          }
        })}
      </>
    );
  };

  const formatText = (text: string): React.ReactNode => {
    const textArray = text
      .replace(/(\r\n)/g, '\n')
      .replace(/(\n\n)/g, '<p>')
      .split('<p>');

    const paragraphs = textArray.map((text) => {
      const sections = text.split('\n');
      return (
        <p>
          {sections.map((section, index) => {
            if (index < sections.length - 1) {
              return (
                <React.Fragment key={index}>
                  {urlAsLink ? getTextWithLinks(section) : section}
                  <br />
                </React.Fragment>
              );
            } else {
              return <React.Fragment key={index}>{urlAsLink ? getTextWithLinks(section) : section}</React.Fragment>;
            }
          })}
        </p>
      );
    });

    return paragraphs;
  };

  const getContent = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, (child) => {
      if (typeof child === 'string') {
        return formatText(child);
      }
      if (React.isValidElement(child)) {
        if (React.isValidElement<{ children: React.ReactNode }>(child) && child?.props?.children) {
          const props = child.props;
          const children = child.props.children;
          return React.cloneElement(child, { ...props, children: getContent(children) });
        }
        return child;
      }
    });
  };

  return (
    <Comp className={cx('text-content', className)} ref={ref} {...rest}>
      {getContent(children)}
    </Comp>
  );
});

if (__DEV__) {
  Text.displayName = 'Text';
}
