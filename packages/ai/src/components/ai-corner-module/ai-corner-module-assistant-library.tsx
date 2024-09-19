import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { MenuBar } from '@sk-web-gui/menubar';
import { Tooltip } from '@sk-web-gui/tooltip';
import { cx } from '@sk-web-gui/utils';
import { X } from 'lucide-react';
import React from 'react';
import { Assistant } from '../../types';
import { AssistantAvatar } from '../assistant-avatar';

export interface AICornerModuleAssistantLibraryProps extends React.ComponentPropsWithoutRef<'div'> {
  assistants: Assistant[];
  /**
   * Id of current assistant
   */
  current?: string;
  onSelectAssistant?: (id: string) => void;
  onClose?: () => void;
  /**
   * Text to describe closebutton.
   * @default Stäng
   */
  closeText?: string;
  /**
   * Will autofocus current or first item
   */
  autofocus?: boolean;
}

export const AICornerModuleAssistantLibrary = React.forwardRef<HTMLDivElement, AICornerModuleAssistantLibraryProps>(
  (props, ref) => {
    const {
      assistants,
      onSelectAssistant,
      onClose,
      className,
      current,
      closeText = 'Stäng',
      autofocus,
      ...rest
    } = props;
    const [active, setActive] = React.useState<string>('');
    const focusRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
      if (autofocus) {
        focusRef.current && focusRef.current.focus();
      }
    }, [focusRef, autofocus]);

    const handleKeyboard = (event: React.KeyboardEvent<HTMLUListElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose && onClose();
      }
    };

    return (
      <div ref={ref} className={cx('sk-ai-corner-module-assistant-library', className)} {...rest}>
        <MenuBar
          className="sk-ai-corner-module-assistant-library-menu"
          onKeyDown={handleKeyboard}
          current={assistants.findIndex((ass) => ass.settings.assistantId === current)}
        >
          {assistants.map((assistant, index) => (
            <MenuBar.Item
              key={`sk-ai-asslib-${assistant.settings.assistantId}`}
              className="sk-ai-corner-module-assistant-library-menu-item"
            >
              <>
                <button
                  ref={current === assistant.settings.assistantId || (!current && index === 0) ? focusRef : undefined}
                  className="sk-ai-corner-module-assistant-library-menu-item-button"
                  aria-current={assistant.settings.assistantId === current ? 'true' : undefined}
                  onMouseEnter={() => setActive(assistant.settings.assistantId)}
                  onMouseLeave={() => setActive('')}
                  onFocus={() => setActive(assistant.settings.assistantId)}
                  onBlur={() => setActive('')}
                  onClick={() => onSelectAssistant && onSelectAssistant(assistant.settings.assistantId)}
                  aria-label={assistant.info.name}
                >
                  <AssistantAvatar assistant={assistant.info} size="md" />
                </button>
                {assistant.settings.assistantId === active && (
                  <Tooltip position="below" aria-hidden>
                    {assistant.info.name}
                  </Tooltip>
                )}
              </>
            </MenuBar.Item>
          ))}
        </MenuBar>
        <Button variant="tertiary" iconButton size="md" showBackground={false} onClick={onClose} aria-label={closeText}>
          <Icon icon={<X />} />
        </Button>
      </div>
    );
  }
);
