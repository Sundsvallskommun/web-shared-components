import Tooltip from '@sk-web-gui/tooltip';
import { cx, DefaultProps } from '@sk-web-gui/utils';
import Quill, { Delta, Range } from 'quill';
import 'quill/dist/quill.snow.css';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { defaultToolbarTokens, ToolbarToken } from './toolbar';
import { getTokenFromElement, getTokenLabel } from './tooltip-text';

export interface TextEditorProps extends DefaultProps {
  readOnly?: boolean;
  defaultValue?: string;
  disableToolbar?: boolean;
  className?: string;
  customToolbar?: ToolbarToken[][];
  onTextChange?: (delta: Delta, oldDelta: Delta, source: string) => void;
  onSelectionChange?: (range: Range, oldRange: Range, source: string) => void;
}

export const TextEditor = forwardRef<Quill, TextEditorProps>(
  ({ readOnly, defaultValue, disableToolbar, className, customToolbar, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const onTextChangeRef = useRef<TextEditorProps['onTextChange']>(onTextChange);
    const onSelectionChangeRef = useRef<TextEditorProps['onSelectionChange']>(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    const tooltipRootsRef = useRef<Set<ReturnType<typeof createRoot>>>(new Set());

    useEffect(() => {
      if (ref && typeof ref === 'object' && ref.current && defaultValue !== undefined) {
        ref.current.clipboard.dangerouslyPasteHTML(defaultValue);
      }
    }, [defaultValue, ref]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const doc = container.ownerDocument;
      const editorContainer = container.appendChild(doc.createElement('div'));

      if (disableToolbar) {
        editorContainer.classList.add('disable-toolbar');
      }

      const toolbarConfig = disableToolbar
        ? false
        : customToolbar && customToolbar.length > 0
          ? customToolbar
          : defaultToolbarTokens;

      const quill = new Quill(editorContainer, {
        modules: { toolbar: toolbarConfig },
        theme: 'snow',
      });

      delete quill.keyboard.bindings['Tab'];

      const input = doc.querySelector('input[data-link]') as HTMLInputElement | null;
      if (input) {
        input.dataset.link = 'https://www.sundsvall.se';
        input.placeholder = 'https://www.sundsvall.se';
      }

      if (ref && typeof ref === 'object') {
        ref.current = quill;
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      const localTooltipRoots = tooltipRootsRef.current;
      const toolbar = container.querySelector('.ql-toolbar');
      if (toolbar) {
        const groups = toolbar.querySelectorAll('.ql-formats');
        groups.forEach((group, index) => {
          if (index === 0) return;
          const divider = doc.createElement('span');
          divider.className = 'ql-divider';
          toolbar.insertBefore(divider, group);
        });

        const controls = toolbar.querySelectorAll('button, select');
        controls.forEach((el) => {
          if (el.querySelector(':scope > .tooltip-container')) return;

          const token = getTokenFromElement(el);
          const tooltipText = token ? getTokenLabel(token) : 'Button';

          el.setAttribute('aria-label', tooltipText);
          el.classList.add('relative');

          const tooltipElement = doc.createElement('div');
          tooltipElement.className = 'tooltip-container';

          const root = createRoot(tooltipElement);
          localTooltipRoots.add(root);
          root.render(<Tooltip position="below">{tooltipText}</Tooltip>);

          el.appendChild(tooltipElement);
        });

        const buttons = controls;
        if (readOnly || disableToolbar) {
          toolbar.classList.add('ql-disabled');
          buttons.forEach((b) => ((b as HTMLButtonElement | HTMLSelectElement).disabled = true));
        } else {
          toolbar.classList.remove('ql-disabled');
          buttons.forEach((b) => ((b as HTMLButtonElement | HTMLSelectElement).disabled = false));
        }
      }

      return () => {
        localTooltipRoots.forEach((root) => root.unmount());
        localTooltipRoots.clear();

        if (ref && typeof ref === 'object') {
          ref.current = null;
        }
        container.innerHTML = '';
      };
    }, [ref, disableToolbar, customToolbar, readOnly]);

    return <div className={cx(className, 'sk-texteditor')} ref={containerRef} />;
  }
);

TextEditor.displayName = 'TextEditor';

export default TextEditor;
