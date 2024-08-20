import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { AIModuleDefaultProps } from './ai-module';
import { AIModuleHeaderProps } from './ai-module-header';
import { AIModuleHeaderMenuItem } from './ai-module-header-menu-item';

export interface AIModuleHeaderMenuProps extends AIModuleDefaultProps, React.ComponentPropsWithoutRef<'ul'> {
  historyOpen?: AIModuleHeaderProps['historyOpen'];
  onOpenHistory?: AIModuleHeaderProps['onOpenHistory'];
  onCloseHistory?: AIModuleHeaderProps['onCloseHistory'];
}

export const AIModuleHeaderMenu = React.forwardRef<HTMLUListElement, AIModuleHeaderMenuProps>((props, ref) => {
  const {
    docked,
    fullscreen,
    isMobile,
    onNewSession,
    onClose,
    onOpen,
    onCloseFullScreen,
    onFullScreen,
    historyOpen,
    showSessionHistory = true,
    onCloseHistory,
    onOpenHistory,
    className,
    children,
    ...rest
  } = props;

  const getPrevElement = (element: HTMLElement): HTMLElement | undefined => {
    const prev = element.previousSibling as HTMLElement;
    if (prev) {
      if (prev?.firstChild?.nodeName === 'BUTTON') {
        return prev.firstChild as HTMLElement;
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
      if (next?.firstChild?.nodeName === 'BUTTON') {
        return next.firstChild as HTMLElement;
      } else {
        return getPrevElement(next);
      }
    } else {
      return undefined;
    }
  };

  const handleKeyboardNavigation = (event: React.KeyboardEvent<HTMLLIElement>) => {
    let target = event.target as HTMLElement;

    switch (event.key) {
      case 'ArrowLeft': {
        if (target.nodeName === 'BUTTON') {
          target = target.parentElement as HTMLElement;
        }
        const prev = target && getPrevElement(target);
        if (prev) {
          prev.focus();
        } else {
          const last = target.parentElement?.lastChild as HTMLElement;
          if (last) {
            if (last.firstChild?.nodeName === 'BUTTON') {
              (last.firstChild as HTMLElement).focus();
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
        if (target.nodeName === 'BUTTON') {
          target = target.parentElement as HTMLElement;
        }
        const next = target && getNextElement(target);
        if (next) {
          next.focus();
        } else {
          const first = target.parentElement?.firstChild as HTMLElement;
          if (first) {
            if (first?.firstChild?.nodeName === 'BUTTON') {
              (first.firstChild as HTMLElement).focus();
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

  const handleToggleOpen = () => {
    if (docked) {
      onOpen && onOpen();
    } else {
      onCloseHistory && onCloseHistory();
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

  const handleOpenHistory = () => {
    if (historyOpen) {
      onCloseHistory && onCloseHistory();
    } else {
      onOpenHistory && onOpenHistory();
    }
  };

  return (
    <ul ref={ref} className={cx('sk-ai-module-header-menu', className)} role="menubar" {...rest}>
      {children ? (
        children
      ) : (
        <>
          {!docked && !fullscreen && (
            <AIModuleHeaderMenuItem
              icon="pencil"
              tabIndex={0}
              onKeyDown={handleKeyboardNavigation}
              label="Ny fråga"
              buttonProps={{ inverted: !fullscreen }}
              onClick={() => onNewSession && onNewSession()}
            />
          )}
          {!docked && !isMobile && (
            <AIModuleHeaderMenuItem
              icon={fullscreen ? 'arrow-down-right' : 'arrow-up-left'}
              tabIndex={!isMobile && fullscreen ? 0 : -1}
              onKeyDown={handleKeyboardNavigation}
              label={`${fullscreen ? 'Stäng' : 'Öppna'} fullskärmsläge`}
              buttonProps={{ inverted: !fullscreen }}
              onClick={() => handleToggleFullscreen()}
            />
          )}
          {!docked && isMobile && showSessionHistory && (
            <AIModuleHeaderMenuItem
              icon="history"
              tabIndex={-1}
              onKeyDown={handleKeyboardNavigation}
              label="Tidigare frågor"
              buttonProps={{
                inverted: true,
                'aria-haspopup': 'menu',
                'aria-expanded': historyOpen,
                id: 'sk-ai-module-mobile-menu',
              }}
              onClick={() => handleOpenHistory()}
            />
          )}
          <AIModuleHeaderMenuItem
            icon={docked ? 'chevrons-up' : 'chevrons-down'}
            tabIndex={docked ? 0 : -1}
            onKeyDown={handleKeyboardNavigation}
            label={docked ? 'Öppna assistent' : 'Minimera'}
            buttonProps={{ inverted: !fullscreen }}
            onClick={() => handleToggleOpen()}
          />
        </>
      )}
    </ul>
  );
});
