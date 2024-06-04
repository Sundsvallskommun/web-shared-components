import React from 'react';
import { ChatHistoryEntry } from '../../types';
import { cx } from '@sk-web-gui/utils';
import { MarkdownRendered } from '../markdown-rendered';
import { sanitized } from '../../services';
import { Link } from '@sk-web-gui/link';
import { Disclosure } from '@sk-web-gui/accordion';
import { useAssistantStore } from '../../assistant-store';
import { Feedback } from '../feedback';
import { TypingBubble } from '../typing-bubble';

interface AIFeedEntryProps extends React.ComponentPropsWithoutRef<'li'> {
  avatar?: React.ReactNode;
  title?: string;
  showTitle?: boolean;
  showReferences?: boolean;
  referenceTitle?: string;
  entry: ChatHistoryEntry;
  loadingMessage?: string;
  loadingComponent?: React.ReactNode;
  showFeedback?: boolean;
  sessionId?: string;
  onGiveFeedback?: (value: -1 | 1) => void;
  size?: 'sm' | 'lg';
}

export const AIFeedEntry = React.forwardRef<HTMLLIElement, AIFeedEntryProps>((props, ref) => {
  const {
    avatar,
    entry,
    className,
    title: _title,
    showTitle,
    loadingMessage = 'Inväntar svar',
    showReferences,
    referenceTitle = 'Kunskapskällor',
    showFeedback = false,
    loadingComponent = <TypingBubble />,
    sessionId,
    onGiveFeedback,
    size,
    ...rest
  } = props;
  const info = useAssistantStore((state) => state.info);
  const { done } = entry;
  const [loading, setLoading] = React.useState<boolean>(false);
  const title = _title || entry.origin === 'user' ? 'Du' : info?.name || '';

  React.useEffect(() => {
    if (!done) {
      setTimeout(() => {
        setLoading(true);
      }, 3500);
    } else {
      setLoading(false);
    }
  }, [done]);

  return (
    <>
      <li ref={ref} className={cx('sk-ai-feed-entry', className)} data-origin={entry.origin} data-size={size} {...rest}>
        <div className="sk-ai-feed-entry-avatar" aria-hidden="true">
          {avatar}
        </div>
        <div className="sk-ai-feed-entry-container">
          <div className="sk-ai-feed-entry-content">
            {!done && !entry.text ? (
              <>{loadingComponent}</>
            ) : (
              <>
                <span className={cx('sk-ai-feed-entry-heading')} data-showtitle={showTitle}>
                  {title || info?.name}
                </span>
                <MarkdownRendered text={sanitized(entry.text)} messageId={entry.id} hideElements={!entry.done} />
              </>
            )}
          </div>
          {showReferences && entry?.references && entry.references?.length > 0 ? (
            <Disclosure
              size="sm"
              className="sk-ai-feed-entry-references"
              header={
                <span className="sk-ai-feed-entry-references-header">
                  {referenceTitle} ({entry.references?.length || 0})
                </span>
              }
            >
              <ul aria-label={referenceTitle} className="sk-ai-feed-entry-references-list">
                {entry.references?.map((reference, refIndex) => (
                  <li className="sk-ai-feed-entry-references-list-item" key={`ref-${refIndex}`}>
                    <small>
                      <Link external href={reference.url}>
                        {reference.title}
                      </Link>
                    </small>
                  </li>
                ))}
              </ul>
            </Disclosure>
          ) : null}
          {showFeedback && sessionId && entry.origin === 'assistant' && done && (
            <Feedback sessionId={sessionId} onGiveFeedback={onGiveFeedback} />
          )}
        </div>
      </li>
      <span className="sk-ai-feed-live-wrapper" aria-live="polite">
        {loading && !done && loadingMessage}
      </span>
    </>
  );
});
