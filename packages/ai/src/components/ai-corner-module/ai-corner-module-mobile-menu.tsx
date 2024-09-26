import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { cx, useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { AssistantInfo, SessionHistory } from '../../types';
import { AICornerModuleProps } from './ai-corner-module';
import { AICornerModuleHeader } from './ai-corner-module-header';
import { AICornerModuleSessions } from './ai-corner-module-sessions';
import { X } from 'lucide-react';
interface AICornerModuleMobileMenuProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  show: boolean;
  assistant: AssistantInfo;
  sessions?: SessionHistory;
  onClose?: () => void;
  onChangeSession?: AICornerModuleProps['onChangeSession'];
}

export const AICornerModuleMobileMenu = React.forwardRef<HTMLDivElement, AICornerModuleMobileMenuProps>(
  (props, ref) => {
    const { className, show, onClose, assistant, sessions, onChangeSession, ...rest } = props;
    const [focusMenu, setFocusMenu] = React.useState<boolean>(false);
    const internalRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const handleChangeSession = (id: string) => {
      onChangeSession && onChangeSession(id);
      onClose && onClose();
    };

    const focusTheMenu = () => {
      setFocusMenu(true);
      setTimeout(() => {
        setFocusMenu(false);
      }, 10);
    };

    React.useEffect(() => {
      show && buttonRef.current && buttonRef.current.focus();
    }, [show]);

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
              if (target.id !== 'sk-ai-corner-module-mobile-menu-close-button') {
                event.preventDefault();
                document.getElementById('sk-ai-corner-module-mobile-menu-close-button')?.focus();
              }
              break;
            case true:
              if (target.id === 'sk-ai-corner-module-mobile-menu-close-button') {
                event.preventDefault();
                focusTheMenu();
              }
              break;
          }
          break;
        }
        case 'Enter': {
          const target = document.activeElement as HTMLElement;
          target.click();
          break;
        }
      }
    };

    return (
      <div
        className={cx('sk-ai-corner-module-mobile-menu', className)}
        data-show={show}
        ref={useForkRef(ref, internalRef)}
        onKeyDown={handleKeyboardNavigation}
        {...rest}
      >
        <div className="sk-ai-corner-module-mobile-menu-top-bar">
          <AICornerModuleHeader variant="alt" assistant={assistant} />
          <Button
            ref={buttonRef}
            variant="tertiary"
            size="sm"
            iconButton
            aria-label="Stäng meny"
            id="sk-ai-corner-module-mobile-menu-close-button"
            onClick={() => onClose && onClose()}
          >
            <Icon icon={<X />} />
          </Button>
        </div>
        <div className="sk-ai-corner-module-mobile-menu-content">
          <AICornerModuleSessions sessions={sessions} onSelectSession={handleChangeSession} focus={focusMenu} />
        </div>
      </div>
    );
  }
);
