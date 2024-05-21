import { Link } from '@sk-web-gui/link';
import React from 'react';
import Markdown, { Options } from 'react-markdown';
import sanitized from '../services/sanitizer-service';
import { cx } from '@sk-web-gui/utils';

interface MarkdownRenderedProps extends Options {
  text: string;
  messageId: string;
  hideElements: boolean;
}

const ParagraphComponent = (props: React.ComponentPropsWithoutRef<'p'>) => {
  return <p className="sk-ai-markdown-p">{props.children}</p>;
};

interface LinkComponentProps {
  hidden: boolean;
  id: string;
}

const LinkComponent =
  ({ hidden, id }: LinkComponentProps) =>
  (props: React.ComponentPropsWithoutRef<'a'>) => {
    const { href, children } = props;
    return (
      <Link
        key={id}
        aria-hidden={hidden ? 'true' : 'false'}
        external={href && href.startsWith('http')}
        href={href}
        className="sk-ai-markdown-a"
        tabIndex={hidden ? -1 : 0}
      >
        {children || href}
      </Link>
    );
  };

const OlComponent = (props: React.ComponentPropsWithoutRef<'ol'>) => {
  return <ol className="sk-ai-markdown-ol">{props.children}</ol>;
};

const UlComponent = (props: React.ComponentPropsWithoutRef<'ul'>) => {
  return <ul className="sk-ai-markdown-ul">{props.children}</ul>;
};

const LiComponent = (props: React.ComponentPropsWithoutRef<'li'>) => {
  return <li className="sk-ai-markdown-li">{props.children}</li>;
};

export const MarkdownRendered: React.FC<MarkdownRenderedProps> = (props) => {
  const { text, components, className, messageId, hideElements, ...rest } = props;

  return (
    <Markdown
      className={cx('sk-ai-markdown', className)}
      disallowedElements={['script', 'iframe']}
      components={{
        p: ParagraphComponent,
        a: LinkComponent({ hidden: hideElements, id: messageId }),
        ol: OlComponent,
        ul: UlComponent,
        li: LiComponent,
        ...components,
      }}
      {...rest}
    >
      {sanitized(text)}
    </Markdown>
  );
};
