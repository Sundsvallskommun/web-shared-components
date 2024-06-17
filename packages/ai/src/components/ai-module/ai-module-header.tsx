import { Avatar } from '@sk-web-gui/avatar';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { AssistantInfo } from '../../types';
import { AIModuleDefaultProps } from './ai-module';

export interface AIModuleHeaderProps extends AIModuleDefaultProps, React.ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'alt';
  assistant: AssistantInfo;
  onOpenMenu?: () => void;
  onCloseMenu?: () => void;
  menuOpen?: boolean;
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
    onOpenMenu,
    onCloseMenu,
    menuOpen,
    onNewSession,
    ...rest
  } = props;

  const handleToggleOpen = () => {
    if (docked) {
      onOpen && onOpen();
    } else {
      onCloseMenu && onCloseMenu();
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

  const handleOpenMenu = () => {
    if (menuOpen) {
      onCloseMenu && onCloseMenu();
    } else {
      onOpenMenu && onOpenMenu();
    }
  };

  const getPrevElement = (element: HTMLElement): HTMLElement | undefined => {
    const prev = element.previousSibling as HTMLElement;
    if (prev) {
      if (window.getComputedStyle(prev).display !== 'none') {
        return prev;
      } else {
        return getPrevElement(prev);
      }
    } else {
      return undefined;
    }
  };

  const getNextElement = (element: HTMLElement): HTMLElement | undefined => {
    const next = element.nextSibling as HTMLElement;
    if (next) {
      if (window.getComputedStyle(next).display !== 'none') {
        return next;
      } else {
        return getPrevElement(next);
      }
    } else {
      return undefined;
    }
  };

  const handleKeyboardNavigation = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    switch (event.key) {
      case 'ArrowLeft': {
        const prev = target && getPrevElement(target);
        if (prev) {
          prev.focus();
        } else {
          const last = target.parentElement?.lastChild as HTMLElement;
          if (last) {
            if (window.getComputedStyle(last).display !== 'none') {
              last.focus();
            } else {
              const nextToLast = getPrevElement(last);
              if (nextToLast) {
                nextToLast.focus();
              }
            }
          }
        }
        break;
      }
      case 'ArrowRight': {
        const next = target && getNextElement(target);
        if (next) {
          next.focus();
        } else {
          const first = target.parentElement?.firstChild as HTMLElement;
          if (first) {
            if (window.getComputedStyle(first).display !== 'none') {
              first.focus();
            } else {
              const nextToLast = getNextElement(first);
              if (nextToLast) {
                nextToLast.focus();
              }
            }
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
              id="sk-ai-module-fullscreen-toggle"
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
          {!docked && !fullscreen && (
            <Button
              variant="tertiary"
              size="sm"
              role="menuitem"
              aria-label={`Alternativ`}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              inverted
              iconButton
              onClick={() => handleOpenMenu()}
              tabIndex={0}
              onKeyDown={handleKeyboardNavigation}
              id="sk-ai-module-mobile-menu"
            >
              <Icon name="menu" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
});
