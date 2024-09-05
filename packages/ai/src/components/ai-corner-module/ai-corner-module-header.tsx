import { Avatar } from '@sk-web-gui/avatar';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { AIFeedAvatar, Assistant, AssistantInfo } from '../../types';
import { AICornerModuleDefaultProps } from './ai-corner-module';
import { AICornerModuleHeaderMenu } from './ai-corner-module-header-menu';
import { AssistantSwitch, AssistantSwitchProps } from '../assistant-switch';
import { AssistantAvatar } from '../assistant-avatar';
import { Plus, MessageCircle } from 'lucide-react';

export interface AICornerModuleHeaderProps extends AICornerModuleDefaultProps, React.ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'alt';
  assistant: AssistantInfo;
  assistants?: Assistant[];
  onOpenHistory?: () => void;
  onCloseHistory?: () => void;
  historyOpen?: boolean;
  avatar?: AIFeedAvatar;
  assistantSwitchProps?: Omit<AssistantSwitchProps, 'assistant' | 'avatar'>;
}

export const AICornerModuleHeader = React.forwardRef<HTMLDivElement, AICornerModuleHeaderProps>((props, ref) => {
  const {
    docked,
    color,
    assistant,
    assistants,
    fullscreen,
    disableFullscreen,
    session,
    className,
    variant = 'default',
    onOpen,
    onClose,
    onFullScreen,
    onCloseFullScreen,
    onOpenHistory,
    onCloseHistory,
    historyOpen,
    showSessionHistory = true,
    onNewSession,
    isMobile,
    title,
    subtitle,
    avatar,
    assistantSwitchProps,
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      className={cx('sk-ai-corner-module-header', className)}
      data-color={color}
      data-docked={docked}
      data-fullscreen={fullscreen}
      data-mobile={isMobile}
      data-variant={variant}
      {...rest}
    >
      {!disableFullscreen && fullscreen && variant === 'default' ? (
        <>
          <Button
            size="sm"
            color="vattjom"
            rightIcon={<Icon icon={<Plus />} />}
            onClick={() => onNewSession && onNewSession()}
          >
            Ny fråga
          </Button>
          <div className="sk-ai-corner-module-header-title">
            <Icon icon={<MessageCircle />} />
            <span className="sk-ai-corner-module-header-heading-name">
              {session?.name ? session?.name : 'Ny fråga'}
            </span>
          </div>
        </>
      ) : variant === 'default' && !fullscreen && !docked && assistants && assistants.length > 1 ? (
        <AssistantSwitch {...assistantSwitchProps} assistant={assistant} avatar={avatar} inverted />
      ) : (
        <div className="sk-ai-corner-module-header-title">
          <AssistantAvatar assistant={assistant} avatar={avatar} size="sm" />
          <div className="sk-ai-corner-module-header-heading">
            <span className="sk-ai-corner-module-header-heading-name">{title || assistant.name}</span>
            {(subtitle || assistant.title) && (docked || variant === 'alt') && (
              <span className="sk-ai-corner-module-header-heading-subtitle">{subtitle || assistant.title}</span>
            )}
          </div>
        </div>
      )}
      {variant === 'default' && (
        <AICornerModuleHeaderMenu
          historyOpen={historyOpen}
          onOpenHistory={onOpenHistory}
          onCloseHistory={onCloseHistory}
          docked={docked}
          fullscreen={fullscreen}
          disableFullscreen={disableFullscreen}
          isMobile={isMobile}
          onNewSession={onNewSession}
          onClose={onClose}
          onOpen={onOpen}
          showSessionHistory={showSessionHistory}
          onCloseFullScreen={onCloseFullScreen}
          onFullScreen={onFullScreen}
        />
      )}
    </div>
  );
});
