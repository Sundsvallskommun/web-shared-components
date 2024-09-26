import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { AICornerModuleDefaultProps } from './ai-corner-module';
import { AICornerModuleHeaderProps } from './ai-corner-module-header';
import { AICornerModuleHeaderMenuItem } from './ai-corner-module-header-menu-item';
import { Pencil, ArrowDownRight, ArrowUpLeft, History, ChevronsDown, ChevronsUp } from 'lucide-react';

export interface AICornerModuleHeaderMenuProps
  extends Omit<AICornerModuleDefaultProps, 'title' | 'subtitle'>,
    React.ComponentPropsWithoutRef<'ul'> {
  historyOpen?: AICornerModuleHeaderProps['historyOpen'];
  onOpenHistory?: AICornerModuleHeaderProps['onOpenHistory'];
  onCloseHistory?: AICornerModuleHeaderProps['onCloseHistory'];
}

export const AICornerModuleHeaderMenu = React.forwardRef<HTMLUListElement, AICornerModuleHeaderMenuProps>(
  (props, ref) => {
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
      disableFullscreen,
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
      <ul ref={ref} className={cx('sk-ai-corner-module-header-menu', className)} role="menubar" {...rest}>
        {children ? (
          children
        ) : (
          <>
            {!docked && !fullscreen && (
              <AICornerModuleHeaderMenuItem
                icon={<Pencil />}
                tabIndex={0}
                onKeyDown={handleKeyboardNavigation}
                label="Ny fråga"
                buttonProps={{ inverted: !fullscreen }}
                onClick={() => onNewSession && onNewSession()}
              />
            )}
            {!disableFullscreen && !docked && !isMobile && (
              <AICornerModuleHeaderMenuItem
                icon={fullscreen ? <ArrowDownRight /> : <ArrowUpLeft />}
                tabIndex={!isMobile && fullscreen ? 0 : -1}
                onKeyDown={handleKeyboardNavigation}
                label={`${fullscreen ? 'Stäng' : 'Öppna'} fullskärmsläge`}
                buttonProps={{ inverted: !fullscreen }}
                onClick={() => handleToggleFullscreen()}
              />
            )}
            {!docked && isMobile && showSessionHistory && (
              <AICornerModuleHeaderMenuItem
                icon={<History />}
                tabIndex={-1}
                onKeyDown={handleKeyboardNavigation}
                label="Tidigare frågor"
                buttonProps={{
                  inverted: true,
                  'aria-haspopup': 'menu',
                  'aria-expanded': historyOpen,
                  id: 'sk-ai-corner-module-mobile-menu',
                }}
                onClick={() => handleOpenHistory()}
              />
            )}
            <AICornerModuleHeaderMenuItem
              icon={docked ? <ChevronsUp /> : <ChevronsDown />}
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
  }
);
