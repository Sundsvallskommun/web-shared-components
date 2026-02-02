import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { AIFeed } from '../ai-feed';
import { AssistantInfo, ChatHistory, SessionFeedbackValueEnum } from '../../types';
import { AIFeedProps } from '../ai-feed/ai-feed';
import { InputSection } from '../input-section';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { X } from 'lucide-react';
import { Avatar } from '@sk-web-gui/avatar';
import { AssistantAvatar } from '../assistant-avatar';

export interface AIServiceModuleAssistantExpandedProps
  extends React.ComponentPropsWithoutRef<'div'>,
    Pick<
      AIFeedProps,
      | 'getAssistantInfoFromHistory'
      | 'avatars'
      | 'showFeedback'
      | 'showTitles'
      | 'showReferences'
      | 'onGiveFeedback'
      | 'inverted'
      | 'titles'
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
      getAssistantInfoFromHistory,
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

    const handleGiveFeedBack = (feedback: SessionFeedbackValueEnum) => {
      onGiveFeedback?.(feedback);
      handleAutoScroll();
    };

    const getUserAvatar = (): React.JSX.Element => {
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

    const getSystemAvatar = (): React.JSX.Element => {
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
        return <AssistantAvatar assistant={assistant} avatar={avatars?.assistant} size="sm" />;
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
              assistant: <AssistantAvatar assistant={assistant} avatar={avatars?.assistant} size="sm" />,
              system: getSystemAvatar(),
            }}
            showFeedback={showFeedback}
            showTitles={showTitles}
            getAssistantInfoFromHistory={getAssistantInfoFromHistory}
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
        <InputSection sessionId={sessionId} variant="multiline" autoFocus />
      </div>
    );
  }
);
