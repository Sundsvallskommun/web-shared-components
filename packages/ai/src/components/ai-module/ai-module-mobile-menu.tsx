import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { cx, useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { AssistantInfo, SessionHistory } from '../../types';
import { AIModuleProps } from './ai-module';
import { AIModuleHeader } from './ai-module-header';
import { AIModuleSessions } from './ai-module-sessions';

interface AIModuleMobileMenuProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  show: boolean;
  assistant: AssistantInfo;
  sessions: SessionHistory;
  onClose?: () => void;
  onNewSession?: () => void;
  onChangeSession?: AIModuleProps['onChangeSession'];
}

export const AIModuleMobileMenu = React.forwardRef<HTMLDivElement, AIModuleMobileMenuProps>((props, ref) => {
  const { className, show, onClose, onNewSession, assistant, sessions, onChangeSession, ...rest } = props;
  const [focusMenu, setFocusMenu] = React.useState<boolean>(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const internalRef = React.useRef<HTMLDivElement>(null);

  const handleNewSession = () => {
    onNewSession && onNewSession();
    onClose && onClose();
  };

  const handleChangeSession = (id: string) => {
    onChangeSession && onChangeSession(id);
    onClose && onClose();
  };

  React.useEffect(() => {
    show && buttonRef.current && buttonRef.current.focus();
  }, [show]);

  const focusTheMenu = () => {
    setFocusMenu(true);
    setTimeout(() => {
      setFocusMenu(false);
    }, 10);
  };

  useOnClickOutside(internalRef, () => {
    onClose && onClose();
  });

  const handleKeyboardNavigation = (event: React.KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'Escape': {
        onClose && onClose();
        break;
      }
      case 'Tab': {
        const target = document.activeElement as HTMLElement;

        switch (event.shiftKey) {
          case false:
            if (target.id !== 'sk-ai-module-mobile-menu-close-button') {
              event.preventDefault();
              document.getElementById('sk-ai-module-mobile-menu-close-button')?.focus();
            }
            break;
          case true:
            if (target.id === 'sk-ai-module-mobile-menu-close-button') {
              event.preventDefault();
              focusTheMenu();
            }
            break;
        }
      }
    }
  };

  return (
    <div
      className={cx('sk-ai-module-mobile-menu', className)}
      data-show={show}
      ref={useForkRef(ref, internalRef)}
      onKeyDown={handleKeyboardNavigation}
      {...rest}
    >
      <div className="sk-ai-module-mobile-menu-top-bar">
        <AIModuleHeader variant="alt" assistant={assistant} />
        <Button
          variant="tertiary"
          size="sm"
          iconButton
          aria-label="Stäng meny"
          id="sk-ai-module-mobile-menu-close-button"
          onClick={() => onClose && onClose()}
        >
          <Icon name="x" />
        </Button>
      </div>
      <div className="sk-ai-module-mobile-menu-content">
        <AIModuleSessions
          sessions={sessions}
          onSelectSession={handleChangeSession}
          focus={focusMenu}
          itemsBefore={[
            <Button
              ref={buttonRef}
              size="sm"
              color="vattjom"
              rightIcon={<Icon name="plus" />}
              onClick={() => handleNewSession()}
            >
              Ny fråga
            </Button>,
          ]}
        />
      </div>
    </div>
  );
});
