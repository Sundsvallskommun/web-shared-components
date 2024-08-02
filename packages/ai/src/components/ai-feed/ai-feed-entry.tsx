import { Disclosure } from '@sk-web-gui/accordion';
import { Link } from '@sk-web-gui/link';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { useAssistantStore } from '../../assistant-store';
import { sanitized } from '../../services';
import { ChatHistoryEntry } from '../../types';
import { Feedback } from '../feedback';
import { MarkdownRendered } from '../markdown-rendered';
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
  /**
   * @default true
   */
  tabbable?: boolean;
  onGiveFeedback?: (value: -1 | 1) => void;
  size?: 'sm' | 'lg';
  inverted?: boolean;
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
    sessionId,
    tabbable,
    onGiveFeedback,
    size,
    inverted,
    loadingComponent = <TypingBubble inverted={inverted} />,
    ...rest
  } = props;
  const info = useAssistantStore((state) => state.info);
  const { done } = entry;
  const [loading, setLoading] = React.useState<boolean>(false);
  const title = _title || entry.origin === 'user' ? 'Du' : info?.name || '';
  const timeout = React.useRef(setTimeout(() => {}));

  React.useEffect(() => {
    if (!done) {
      timeout.current = setTimeout(() => {
        setLoading(true);
      }, 3500);
    } else {
      clearTimeout(timeout.current);
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
                <MarkdownRendered
                  text={sanitized(entry.text)}
                  messageId={entry.id}
                  hideElements={!entry.done}
                  tabbable={tabbable}
                />
              </>
            )}
          </div>
          {showReferences && entry?.references && entry.references?.length > 0 ? (
            <Disclosure
              size="sm"
              className="sk-ai-feed-entry-references"
              inverted={inverted}
              header={
                <span className="sk-ai-feed-entry-references-header" data-inverted={inverted}>
                  {referenceTitle} ({entry.references?.length || 0})
                </span>
              }
            >
              <ul aria-label={referenceTitle} className="sk-ai-feed-entry-references-list">
                {entry.references?.map((reference, refIndex) => (
                  <li className="sk-ai-feed-entry-references-list-item" key={`ref-${refIndex}`}>
                    <small>
                      <Link external href={reference.url} inverted={inverted}>
                        {reference.title}
                      </Link>
                    </small>
                  </li>
                ))}
              </ul>
            </Disclosure>
          ) : null}
          {showFeedback && sessionId && entry.origin === 'assistant' && done && (
            <Feedback sessionId={sessionId} onGiveFeedback={onGiveFeedback} inverted={inverted} />
          )}
        </div>
      </li>
      <span className="sk-ai-feed-live-wrapper" aria-live="polite">
        {loading && !done && loadingMessage}
      </span>
    </>
  );
});
