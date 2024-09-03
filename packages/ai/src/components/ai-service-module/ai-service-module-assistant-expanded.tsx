import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { AIFeed } from '../ai-feed';
import { AssistantInfo, ChatHistory } from '../../types';
import { AIFeedProps } from '../ai-feed/ai-feed';
import { InputSection } from '../input-section';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { X } from 'lucide-react';
import { Avatar } from '@sk-web-gui/avatar';

export interface AIServiceModuleAssistantExpandedProps
  extends React.ComponentPropsWithoutRef<'div'>,
    Pick<
      AIFeedProps,
      'avatars' | 'showFeedback' | 'showTitles' | 'showReferences' | 'onGiveFeedback' | 'inverted' | 'titles'
    > {
  history: ChatHistory;
  sessionId?: string;
  onClose?: () => void;
  assistant: AssistantInfo;
}

export const AIServiceModuleAssistantExpanded = React.forwardRef<HTMLDivElement, AIServiceModuleAssistantExpandedProps>(
  (props, ref) => {
    const {
      onClose,
      className,
      history,
      sessionId,
      avatars,
      showFeedback,
      showTitles,
      showReferences,
      onGiveFeedback,
      inverted,
      titles,
      assistant,
      ...rest
    } = props;

    const scrollRef = React.useRef<HTMLDivElement>(null);

    const handleAutoScroll = () => {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 10);
    };
    React.useEffect(() => {
      handleAutoScroll();
    }, [history, showFeedback]);

    const handleGiveFeedBack = (feedback: -1 | 1) => {
      onGiveFeedback && onGiveFeedback(feedback);
      handleAutoScroll();
    };

    const getAssistantAvatar = (): JSX.Element => {
      if (avatars?.assistant) {
        if (avatars.assistant.type === Avatar) {
          return React.cloneElement(avatars.assistant, {
            ...avatars.assistant.props,
            size: 'sm',
          });
        } else {
          return avatars.assistant;
        }
      } else {
        return (
          <Avatar
            imageElement={typeof assistant.avatar !== 'string' ? assistant.avatar : undefined}
            imageUrl={typeof assistant.avatar === 'string' ? assistant.avatar : undefined}
            initials={assistant.shortName}
            size="sm"
          />
        );
      }
    };

    const getUserAvatar = (): JSX.Element => {
      if (avatars?.user) {
        if (avatars.user.type === Avatar) {
          return React.cloneElement(avatars.user, {
            ...avatars.user.props,
            size: 'sm',
          });
        } else {
          return avatars.user;
        }
      } else {
        return <Avatar initials="DU" color="bjornstigen" size="sm" />;
      }
    };

    const getSystemAvatar = (): JSX.Element => {
      if (avatars?.system) {
        if (avatars.system.type === Avatar) {
          return React.cloneElement(avatars.system, {
            ...avatars.system.props,
            size: 'sm',
          });
        } else {
          return avatars.system;
        }
      } else {
        return getAssistantAvatar();
      }
    };

    return (
      <div
        ref={ref}
        className={cx('sk-ai-service-module-assistant-expanded', className)}
        data-inverted={inverted}
        {...rest}
      >
        <div ref={scrollRef} className="sk-ai-service-module-assistant-expanded-feed">
          <AIFeed
            history={history}
            sessionId={sessionId}
            avatars={{
              user: getUserAvatar(),
              assistant: getAssistantAvatar(),
              system: getSystemAvatar(),
            }}
            showFeedback={showFeedback}
            showTitles={showTitles}
            onGiveFeedback={handleGiveFeedBack}
            inverted={inverted}
            titles={titles}
            showReferences={showReferences}
            size="sm"
          />
        </div>
        <Button
          size="sm"
          variant="tertiary"
          rounded
          className="sk-ai-service-module-assistant-expanded-close-button"
          onClick={() => onClose && onClose()}
          iconButton
          type="button"
          aria-label="Stäng sökresultat"
        >
          <Icon icon={<X />} />
        </Button>
        <InputSection sessionId={sessionId} variant="inset" autoFocus />
      </div>
    );
  }
);
