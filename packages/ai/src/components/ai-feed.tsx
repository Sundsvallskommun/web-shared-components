import { cx, useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { useChat } from '../hooks';
import { ChatHistoryEntry } from '../types';
import { AIFeedAvatarMap } from '../types/avatar';
import { AIFeedEntry } from './ai-feed-entry';

interface AIFeedProps extends React.ComponentPropsWithoutRef<'ul'> {
  showReferences?: boolean;
  avatars?: AIFeedAvatarMap;
  showFeedback?: boolean;
  showTitles?: boolean;
}

export const AIFeed = React.forwardRef<HTMLUListElement, AIFeedProps>((props, ref) => {
  const [lastMessage, setLastMessage] = React.useState<ChatHistoryEntry | undefined>(undefined);
  const [lastOwnMessage, setLastOwnMessage] = React.useState<ChatHistoryEntry | undefined>(undefined);
  const internalRef = React.useRef<HTMLUListElement>(null);
  const { showReferences = true, avatars, className, showFeedback = true, showTitles = true, ...rest } = props;
  const { history } = useChat();

  React.useEffect(() => {
    const latest = history.at(-1);
    if (latest?.done && latest.origin !== 'user') {
      setLastMessage(latest);
    }
    if (latest?.done && latest.origin === 'user') {
      setLastOwnMessage(latest);
    }
  }, [history]);

  React.useEffect(() => {
    if (internalRef.current) {
      internalRef.current.scrollTop = internalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <>
      <ul ref={useForkRef(ref, internalRef)} className={cx('sk-ai-feed', className)} tabIndex={0} {...rest}>
        {history?.map((entry, index) => (
          <AIFeedEntry
            key={`${index}-${entry.id}`}
            showReferences={showReferences}
            entry={entry}
            avatar={avatars ? avatars[entry.origin] : undefined}
            showFeedback={showFeedback}
            showTitle={showTitles}
          ></AIFeedEntry>
        ))}
      </ul>
      <div className="sr-only" aria-live="polite" aria-atomic={false}>
        {lastMessage && (
          <AIFeedEntry showReferences={false} entry={lastMessage} showFeedback={false} showTitle={false}></AIFeedEntry>
        )}
      </div>
      <div className="sr-only" aria-live="polite" aria-atomic={false}>
        {lastOwnMessage && (
          <AIFeedEntry
            showReferences={false}
            entry={lastOwnMessage}
            showFeedback={false}
            showTitle={false}
          ></AIFeedEntry>
        )}
      </div>
    </>
  );
});
