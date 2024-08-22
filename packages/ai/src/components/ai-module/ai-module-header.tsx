import { Avatar } from '@sk-web-gui/avatar';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { AssistantInfo } from '../../types';
import { AIModuleDefaultProps } from './ai-module';
import { Tooltip } from '@sk-web-gui/tooltip';
import { AIModuleHeaderMenu } from './ai-module-header-menu';

export interface AIModuleHeaderProps extends AIModuleDefaultProps, React.ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'alt';
  assistant: AssistantInfo;
  onOpenHistory?: () => void;
  onCloseHistory?: () => void;
  historyOpen?: boolean;
}

export const AIModuleHeader = React.forwardRef<HTMLDivElement, AIModuleHeaderProps>((props, ref) => {
  const {
    docked,
    color,
    assistant,
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
    ...rest
  } = props;

  return (
    <div
      ref={ref}
      className={cx('sk-ai-module-header', className)}
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
            rightIcon={<Icon name="plus" />}
            onClick={() => onNewSession && onNewSession()}
          >
            Ny fråga
          </Button>
          <div className="sk-ai-module-header-title">
            <Icon name="message-circle" />
            <span className="sk-ai-module-header-heading-name">{session?.name ? session?.name : 'Ny fråga'}</span>
          </div>
        </>
      ) : (
        <div className="sk-ai-module-header-title">
          <Avatar
            className="sk-ai-module-header-avatar"
            size={variant === 'alt' ? 'lg' : docked ? 'md' : 'sm'}
            imageElement={typeof assistant.avatar !== 'string' ? assistant.avatar : undefined}
            imageUrl={typeof assistant.avatar === 'string' ? assistant.avatar : undefined}
            imageAlt=""
            aria-hidden
          />
          <div className="sk-ai-module-header-heading">
            <span className="sk-ai-module-header-heading-name">{title || assistant.name}</span>
            {(subtitle || assistant.title) && (docked || variant === 'alt') && (
              <span className="sk-ai-module-header-heading-subtitle">{subtitle || assistant.title}</span>
            )}
          </div>
        </div>
      )}
      {variant === 'default' && (
        <AIModuleHeaderMenu
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
