import { cx } from '@sk-web-gui/utils';
import { Avatar } from '@sk-web-gui/avatar';
import React from 'react';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { AIModuleDefaultProps } from './ai-module';
import { AssistantInfo } from '../../types';

export interface AIModuleHeaderProps extends AIModuleDefaultProps, React.ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'alt';
  assistant: AssistantInfo;
}

export const AIModuleHeader = React.forwardRef<HTMLDivElement, AIModuleHeaderProps>((props, ref) => {
  const {
    docked,
    color,
    assistant,
    fullscreen,
    session,
    className,
    variant = 'default',
    onOpen,
    onClose,
    onFullScreen,
    onCloseFullScreen,
    onNewSession,
    ...rest
  } = props;

  const handleToggleOpen = () => {
    if (docked) {
      onOpen && onOpen();
    } else {
      onClose && onClose();
    }
  };
  const handleToggleFullscreen = () => {
    if (fullscreen) {
      onCloseFullScreen && onCloseFullScreen();
    } else {
      onFullScreen && onFullScreen();
    }
  };

  const handleKeyboardNavigation = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    switch (event.key) {
      case 'ArrowLeft': {
        const prev = target && (target.previousSibling as HTMLElement);
        if (prev) {
          prev.focus();
        } else {
          const last = target.parentElement?.lastChild as HTMLElement;
          if (last) {
            last.focus();
          }
        }
        break;
      }
      case 'ArrowRight': {
        const next = target && (target.nextSibling as HTMLElement);
        if (next) {
          next.focus();
        } else {
          const first = target.parentElement?.firstChild as HTMLElement;
          if (first) {
            first.focus();
          }
        }
        break;
      }
    }
  };

  return (
    <div
      ref={ref}
      className={cx('sk-ai-module-header', className)}
      data-color={color}
      data-docked={docked}
      data-fullscreen={fullscreen}
      data-variant={variant}
      {...rest}
    >
      {fullscreen && variant === 'default' ? (
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
            <span className="sk-ai-module-header-heading-name">{assistant.name}</span>
            {assistant.title && (docked || variant === 'alt') && (
              <span className="sk-ai-module-header-heading-subtitle">{assistant.title}</span>
            )}
          </div>
        </div>
      )}
      {variant === 'default' && (
        <div className="sk-ai-module-header-menu" role="menubar">
          {!docked && (
            <Button
              variant="tertiary"
              size="sm"
              role="menuitem"
              aria-label={`${fullscreen ? 'Stäng' : 'Öppna'} fullskärmsläge`}
              inverted={!fullscreen}
              iconButton
              onClick={() => handleToggleFullscreen()}
              tabIndex={0}
              onKeyDown={handleKeyboardNavigation}
            >
              <Icon name={fullscreen ? 'arrow-down-right' : 'arrow-up-left'} />
            </Button>
          )}
          <Button
            variant="tertiary"
            size="sm"
            role="menuitem"
            aria-label={docked ? 'Öppna assistent' : 'Minimera'}
            inverted={!fullscreen}
            iconButton
            tabIndex={docked ? 0 : -1}
            onClick={() => handleToggleOpen()}
            onKeyDown={handleKeyboardNavigation}
          >
            <Icon name={docked ? 'chevrons-up' : 'chevrons-down'} />
          </Button>
        </div>
      )}
    </div>
  );
});
