import { useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { ChatHistory, ChatHistoryEntry } from '../../types';
import { AIFeedAvatarMap } from '../../types/avatar';
import { AIFeedEntry } from './ai-feed-entry';
import { AIFeedWrapper } from './ai-feed-wrapper';

export interface AIFeedProps extends React.ComponentPropsWithoutRef<'ul'> {
  history: ChatHistory;
  showReferences?: boolean;
  avatars?: AIFeedAvatarMap;
  showFeedback?: boolean;
  showTitles?: boolean;
  onGiveFeedback?: () => void;
  size?: 'sm' | 'lg';
}

export const AIFeed = React.forwardRef<HTMLUListElement, AIFeedProps>((props, ref) => {
  const [lastMessage, setLastMessage] = React.useState<ChatHistoryEntry | undefined>(undefined);
  const [lastOwnMessage, setLastOwnMessage] = React.useState<ChatHistoryEntry | undefined>(undefined);
  const internalRef = React.useRef<HTMLUListElement>(null);
  const {
    history,
    onGiveFeedback,
    showReferences = true,
    avatars,
    className,
    showFeedback = true,
    showTitles = true,
    size,
    ...rest
  } = props;

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
      <AIFeedWrapper ref={useForkRef(ref, internalRef)} className={className} tabIndex={0} {...rest}>
        {history?.map((entry, index) => (
          <AIFeedEntry
            key={`${index}-${entry.id}`}
            showReferences={showReferences}
            entry={entry}
            avatar={avatars ? avatars[entry.origin] : undefined}
            showFeedback={showFeedback && entry.done && entry.id === lastMessage?.id}
            showTitle={showTitles}
            onGiveFeedback={onGiveFeedback}
            size={size}
          ></AIFeedEntry>
        ))}
      </AIFeedWrapper>
      <div className="sk-ai-feed-live-wrapper" aria-live="polite" aria-atomic={false}>
        {lastMessage && (
          <AIFeedEntry showReferences={false} entry={lastMessage} showFeedback={false} showTitle={false}></AIFeedEntry>
        )}
      </div>
      <div className="sk-ai-feed-live-wrapper" aria-live="polite" aria-atomic={false}>
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
