import { Link } from '@sk-web-gui/link';
import { PopupMenu } from '@sk-web-gui/popup-menu';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import Markdown, { Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatEntryReference } from '../types';
import { INLINE_REFERENCE_LINK_PREFIX, prepareTextWithInlineReferences } from './inline-reference-utils';

interface MarkdownRenderedProps extends Options, Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  text: string;
  messageId: string;
  hideElements: boolean;
  references?: ChatEntryReference[];
  showReferences?: boolean;
  /**
   * If links should be tabbable
   * @default true
   */
  tabbable?: boolean;
}

const ParagraphComponent = (props: React.ComponentPropsWithoutRef<'p'>) => {
  return <p className="sk-ai-markdown-p">{props.children}</p>;
};

interface InlineReferenceButtonProps {
  hidden: boolean;
  href: string;
  references: ChatEntryReference[];
  tabbable: boolean;
  children: React.ReactNode;
}

const InlineReferenceButton: React.FC<InlineReferenceButtonProps> = ({
  hidden,
  href,
  references,
  tabbable,
  children,
}) => {
  const referenceId = decodeURIComponent(href.replace(INLINE_REFERENCE_LINK_PREFIX, ''));
  const reference = references.find((item) => item.id === referenceId);
  const number = React.Children.toArray(children).join('');

  if (!reference) {
    return null;
  }

  return (
    <span className="sk-ai-markdown-inline-reference">
      <PopupMenu type="dialog" position="under" align="end" autoAlign autoPosition>
        <PopupMenu.Button
          type="button"
          size="sm"
          variant="tertiary"
          rounded
          className="sk-ai-markdown-inline-reference-button"
          aria-hidden={hidden ? 'true' : 'false'}
          aria-label={`Källa ${number}: ${reference.title}`}
          tabIndex={hidden || !tabbable ? -1 : 0}
        >
          {number}
        </PopupMenu.Button>
        <PopupMenu.Panel className="sk-ai-markdown-inline-reference-popup">
          <small>
            {reference.url ? (
              <Link external href={reference.url}>
                {reference.title}
              </Link>
            ) : (
              reference.title
            )}
          </small>
        </PopupMenu.Panel>
      </PopupMenu>
    </span>
  );
};

interface LinkComponentProps {
  hidden: boolean;
  id: string;
  references: ChatEntryReference[];
  tabbable: boolean;
}

const LinkComponent =
  ({ hidden, id, references, tabbable }: LinkComponentProps) =>
  (props: React.ComponentPropsWithoutRef<'a'>) => {
    const { href, children } = props;

    if (href?.startsWith(INLINE_REFERENCE_LINK_PREFIX)) {
      return (
        <InlineReferenceButton hidden={hidden} href={href} references={references} tabbable={tabbable}>
          {children}
        </InlineReferenceButton>
      );
    }

    return (
      <Link
        key={id}
        aria-hidden={hidden ? 'true' : 'false'}
        external={href && href.startsWith('http')}
        href={href}
        className="sk-ai-markdown-a"
        tabIndex={hidden || !tabbable ? -1 : 0}
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

const CodeComponent = (props: React.ComponentPropsWithoutRef<'code'>) => {
  return <code className="sk-ai-markdown-code">{props.children}</code>;
};

const PreComponent = (props: React.ComponentPropsWithoutRef<'pre'>) => {
  return <pre className="sk-ai-markdown-pre">{props.children}</pre>;
};

export const MarkdownRendered: React.FC<MarkdownRenderedProps> = (props) => {
  const {
    text,
    components,
    className,
    messageId,
    hideElements,
    references = [],
    showReferences = true,
    tabbable = true,
    ...rest
  } = props;
  const preparedText = prepareTextWithInlineReferences(text, references, showReferences);

  return (
    <div className={cx('sk-ai-markdown', className)}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        disallowedElements={['script', 'iframe']}
        components={{
          p: ParagraphComponent,
          a: LinkComponent({ hidden: hideElements, id: messageId, references, tabbable }),
          ol: OlComponent,
          ul: UlComponent,
          li: LiComponent,
          code: CodeComponent,
          pre: PreComponent,
          ...components,
        }}
        {...rest}
      >
        {preparedText}
      </Markdown>
    </div>
  );
};
