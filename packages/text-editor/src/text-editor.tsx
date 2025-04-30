import Tooltip from '@sk-web-gui/tooltip';
import { cx, DefaultProps } from '@sk-web-gui/utils';
import Quill, { Delta, Range } from 'quill';
import 'quill/dist/quill.snow.css';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { toolbarOptions } from './toolbar';
import { TooltipText } from './tooltip-text';

export interface TextEditorProps extends DefaultProps {
  readOnly?: boolean;
  defaultValue?: string;
  disableToolbar?: boolean;
  className?: string;
  onTextChange?: (delta: Delta, oldDelta: Delta, source: string) => void;
  onSelectionChange?: (range: Range, oldRange: Range, source: string) => void;
}

export const TextEditor = forwardRef<Quill, TextEditorProps>(
  ({ readOnly, defaultValue, disableToolbar, className, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef<string | undefined>(defaultValue);
    const onTextChangeRef = useRef<TextEditorProps['onTextChange']>(onTextChange);
    const onSelectionChangeRef = useRef<TextEditorProps['onSelectionChange']>(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.appendChild(container.ownerDocument.createElement('div'));

      if (disableToolbar) {
        editorContainer.classList.add('rounded-t-xl');
      }

      const quill = new Quill(editorContainer, {
        modules: {
          toolbar: disableToolbar ? false : toolbarOptions,
        },
        theme: 'snow',
      });

      if (ref && typeof ref === 'object') {
        ref.current = quill;
      }

      if (defaultValueRef.current) {
        quill.clipboard.dangerouslyPasteHTML(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      const toolbar = container.querySelector('.ql-toolbar');
      if (toolbar) {
        const dividerPositions = [2, 4];

        dividerPositions.forEach((position) => {
          const divider = document.createElement('span');
          divider.className = 'ql-divider';
          toolbar.insertBefore(divider, toolbar.children[position]);
        });
      }

      return () => {
        if (ref && typeof ref === 'object') {
          ref.current = null;
        }
        container.innerHTML = '';
      };
    }, [ref, disableToolbar]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const toolbar = container.querySelector('.ql-toolbar');
      const editorContainer = container.querySelector('.ql-container');

      if (toolbar) {
        const buttons = toolbar.querySelectorAll('button, select');

        buttons.forEach((button, key) => {
          const tooltipText = TooltipText[key] || 'Button';

          button.classList.add('relative');

          const tooltipElement = document.createElement('div');
          tooltipElement.className = 'tooltip-container';

          const root = createRoot(tooltipElement);
          root.render(<Tooltip position="below">{tooltipText}</Tooltip>);

          button.appendChild(tooltipElement);
        });

        if (readOnly || disableToolbar) {
          toolbar.classList.add('ql-disabled');
          buttons.forEach((button) => {
            (button as HTMLButtonElement | HTMLSelectElement).disabled = true;
          });
        } else {
          toolbar.classList.remove('ql-disabled');
          buttons.forEach((button) => {
            (button as HTMLButtonElement | HTMLSelectElement).disabled = false;
          });
        }
      }

      if (editorContainer) {
        if (ref && typeof ref === 'object' && ref.current) {
          ref.current.enable(!readOnly);
        }
      }
    }, [readOnly, disableToolbar, ref]);

    return <div className={cx(className, 'sk-texteditor')} ref={containerRef} />;
  }
);

TextEditor.displayName = 'TextEditor';

export default TextEditor;
