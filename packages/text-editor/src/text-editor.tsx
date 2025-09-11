import Tooltip from '@sk-web-gui/tooltip';
import { cx, DefaultProps } from '@sk-web-gui/utils';
import Quill, { Delta, Range } from 'quill';
import 'quill/dist/quill.snow.css';
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { defaultToolbarTokens, ToolbarConfig } from './toolbar';
import { getTokenFromElement, getTokenLabel } from './tooltip-text';

export interface TextEditorProps extends DefaultProps {
  readOnly?: boolean;
  defaultValue?: string;
  disableToolbar?: boolean;
  className?: string;
  toolbar?: ToolbarConfig;
  onTextChange?: (delta: Delta, oldDelta: Delta, source: string) => void;
  onSelectionChange?: (range: Range, oldRange: Range, source: string) => void;
}

function TooltipPortal({ container, children }: { container: Element; children: React.ReactNode }) {
  return createPortal(children, container);
}

function TooltipManager({ controls }: { controls: Element[] }) {
  return (
    <>
      {controls.map((el, i) => {
        let container = el.querySelector(':scope > .tooltip-container') as HTMLDivElement | null;
        if (!container) {
          container = document.createElement('div');
          container.className = 'tooltip-container';
          el.appendChild(container);
        }

        const token = getTokenFromElement(el);
        const tooltipText = token ? getTokenLabel(token) : 'Button';

        el.setAttribute('aria-label', tooltipText);
        el.classList.add('relative');

        return (
          <TooltipPortal key={i} container={container}>
            <Tooltip position="below">{tooltipText}</Tooltip>
          </TooltipPortal>
        );
      })}
    </>
  );
}

export const TextEditor = forwardRef<Quill | null, TextEditorProps>(
  ({ readOnly, defaultValue, disableToolbar, className, toolbar, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);
    const onTextChangeRef = useRef<TextEditorProps['onTextChange']>(onTextChange);
    const onSelectionChangeRef = useRef<TextEditorProps['onSelectionChange']>(onSelectionChange);
    const [controls, setControls] = useState<Element[]>([]);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (quillRef.current && defaultValue !== undefined) {
        quillRef.current.clipboard.dangerouslyPasteHTML(defaultValue);
      }
    }, [defaultValue]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const doc = container.ownerDocument;
      const editorContainer = container.appendChild(doc.createElement('div'));

      if (disableToolbar) {
        editorContainer.classList.add('disable-toolbar');
      }

      const toolbarConfig = disableToolbar ? false : toolbar && toolbar.length > 0 ? toolbar : defaultToolbarTokens;

      const quill = new Quill(editorContainer, {
        modules: { toolbar: toolbarConfig },
        theme: 'snow',
      });

      quillRef.current = quill;
      if (ref && typeof ref === 'object') {
        ref.current = quill;
      }

      delete quill.keyboard.bindings['Tab'];

      const input = doc.querySelector('input[data-link]') as HTMLInputElement | null;
      if (input) {
        input.dataset.link = 'https://www.sundsvall.se';
        input.placeholder = 'https://www.sundsvall.se';
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      const usedToolbar = container.querySelector('.ql-toolbar');
      if (usedToolbar) {
        const groups = usedToolbar.querySelectorAll('.ql-formats');
        groups.forEach((group, index) => {
          if (index === 0) return;
          const divider = doc.createElement('span');
          divider.className = 'ql-divider';
          usedToolbar.insertBefore(divider, group);
        });

        const foundControls = Array.from(usedToolbar.querySelectorAll('button, select'));
        setControls(foundControls);
      } else {
        setControls([]);
      }

      return () => {
        if (ref && typeof ref === 'object') {
          ref.current = null;
        }
        quillRef.current = null;
        setControls([]);
        container.innerHTML = '';
      };
    }, [ref, disableToolbar, toolbar]);

    useEffect(() => {
      const quill = quillRef.current;
      const container = containerRef.current;
      const usedToolbar = container?.querySelector('.ql-toolbar');
      const shouldDisableToolbar = !!disableToolbar || !!readOnly;

      if (quill) {
        quill.enable(!readOnly);
      }

      if (usedToolbar) {
        const ctrls = usedToolbar.querySelectorAll('button, select');
        if (shouldDisableToolbar) {
          usedToolbar.classList.add('ql-disabled');
          ctrls.forEach((b) => ((b as HTMLButtonElement | HTMLSelectElement).disabled = true));
        } else {
          usedToolbar.classList.remove('ql-disabled');
          ctrls.forEach((b) => ((b as HTMLButtonElement | HTMLSelectElement).disabled = false));
        }
      }
    }, [readOnly, disableToolbar]);

    return (
      <div className={cx(className, 'sk-texteditor')} ref={containerRef}>
        {controls.length > 0 && <TooltipManager controls={controls} />}
      </div>
    );
  }
);

TextEditor.displayName = 'TextEditor';

export default TextEditor;
