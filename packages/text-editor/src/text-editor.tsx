import Tooltip from '@sk-web-gui/tooltip';
import { CustomOnChangeEvent, cx, DefaultProps } from '@sk-web-gui/utils';
import Quill, { Delta, Range } from 'quill';
import 'quill/dist/quill.snow.css';
import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Minus, Plus } from 'lucide-react';
import { defaultToolbarTokens, ToolbarConfig } from './toolbar';
import { getTokenFromElement, getTokenLabel } from './tooltip-text';

const TEXT_SCALE_MIN = 50;
const TEXT_SCALE_MAX = 200;
const TEXT_SCALE_STEP = 10;
const TEXT_SCALE_DEFAULT = 100;
const TEXT_BASE_FONT_SIZE = 16;

export interface TextEditorValue {
  plainText?: string;
  markup?: string;
}

export interface TextEditorProps extends DefaultProps {
  name?: string;
  readOnly?: boolean;
  value?: TextEditorValue;
  disableToolbar?: boolean;
  className?: string;
  toolbar?: ToolbarConfig;
  /** Show visual zoom controls (+/-) in the toolbar. Does not affect exported content. */
  visualZoom?: boolean;
  onTextChange?: (delta: Delta, oldDelta: Delta, source: string) => void;
  onSelectionChange?: (range: Range, oldRange: Range, source: string) => void;
  onChange?: (event: CustomOnChangeEvent<TextEditorValue, HTMLInputElement>) => void;
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

/**
 * Convert Quill's internal list format to standard HTML lists.
 * Quill renders: <ol><li data-list="bullet"><span class="ql-ui"></span>text</li></ol>
 * Standard:      <ul><li>text</li></ul>
 */
function quillListToHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  doc.querySelectorAll('ol').forEach((ol) => {
    const items = Array.from(ol.querySelectorAll(':scope > li[data-list]'));
    if (items.length === 0) return;

    // Group consecutive items by list type
    const groups: { type: string; items: Element[] }[] = [];
    items.forEach((item) => {
      const type = item.getAttribute('data-list') || 'ordered';
      const last = groups[groups.length - 1];
      if (last && last.type === type) {
        last.items.push(item);
      } else {
        groups.push({ type, items: [item] });
      }
    });

    const fragment = doc.createDocumentFragment();
    groups.forEach((group) => {
      const list = doc.createElement(group.type === 'bullet' ? 'ul' : 'ol');
      group.items.forEach((item) => {
        const li = doc.createElement('li');
        const clone = item.cloneNode(true) as Element;
        clone.querySelectorAll('span.ql-ui').forEach((s) => s.remove());
        clone.removeAttribute('data-list');
        li.innerHTML = clone.innerHTML;
        list.appendChild(li);
      });
      fragment.appendChild(list);
    });

    ol.parentNode?.replaceChild(fragment, ol);
  });

  return doc.body.innerHTML;
}

/**
 * Convert standard HTML lists (and Quill's format) to Quill-compatible format for import.
 * Ensures <ul> becomes <ol> with data-list="bullet" so Quill's clipboard.convert handles it.
 */
function htmlToQuillList(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  // Convert <ul> to <ol data-list="bullet">
  doc.querySelectorAll('ul').forEach((ul) => {
    const ol = doc.createElement('ol');
    while (ul.firstChild) {
      const child = ul.firstChild;
      if (child instanceof Element && child.tagName === 'LI') {
        child.setAttribute('data-list', 'bullet');
      }
      ol.appendChild(child);
    }
    ul.parentNode?.replaceChild(ol, ul);
  });

  // Ensure <ol> > <li> without data-list get data-list="ordered"
  doc.querySelectorAll('ol > li:not([data-list])').forEach((li) => {
    li.setAttribute('data-list', 'ordered');
  });

  return doc.body.innerHTML;
}

export const TextEditor = forwardRef<Quill | null, TextEditorProps>((props, ref) => {
  const {
    name = '',
    readOnly,
    value,
    disableToolbar,
    className,
    toolbar,
    visualZoom,
    onTextChange,
    onSelectionChange,
    onChange,
  } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const onTextChangeRef = useRef<TextEditorProps['onTextChange']>(onTextChange);
  const onSelectionChangeRef = useRef<TextEditorProps['onSelectionChange']>(onSelectionChange);
  const onChangeRef = useRef<TextEditorProps['onChange']>(onChange);
  const [controls, setControls] = useState<Element[]>([]);
  const [textScale, setTextScale] = useState(TEXT_SCALE_DEFAULT);

  const decreaseScale = useCallback(() => {
    setTextScale((prev) => Math.max(TEXT_SCALE_MIN, prev - TEXT_SCALE_STEP));
  }, []);

  const increaseScale = useCallback(() => {
    setTextScale((prev) => Math.min(TEXT_SCALE_MAX, prev + TEXT_SCALE_STEP));
  }, []);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
    onSelectionChangeRef.current = onSelectionChange;
  });

  useEffect(() => {
    const quill = quillRef?.current;
    if (!quill) return;

    const quillMarkup = quillListToHtml(quill.root.innerHTML);
    const quillplainText = quill.getText();

    if (value?.markup !== undefined && value?.markup !== quillMarkup) {
      const normalizedHtml = htmlToQuillList(value.markup);
      const delta = quill.clipboard.convert({ html: normalizedHtml });
      quill.setContents(delta);
    }
    if (value?.markup === undefined && value?.plainText !== undefined && value.plainText !== quillplainText) {
      quill.setText(value.plainText);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.markup, value?.plainText, quillRef?.current]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const doc = container.ownerDocument;
    const editorContainer = container.appendChild(doc.createElement('div'));

    if (disableToolbar) {
      editorContainer.classList.add('disable-toolbar');
    }

    const toolbarConfig = disableToolbar ? false : toolbar && toolbar.length > 0 ? toolbar : defaultToolbarTokens;

    if (!quillRef.current) {
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
        const plainText = quillRef.current?.getText();
        const rawMarkup = quillRef.current?.root.innerHTML;
        const markup = rawMarkup ? quillListToHtml(rawMarkup) : rawMarkup;

        const event = {
          target: { name: name, value: { plainText, markup } },
        } as CustomOnChangeEvent<TextEditorValue>;
        onChangeRef.current?.(event);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, disableToolbar, JSON.stringify(toolbar)]);

  useEffect(() => {
    const editor = containerRef.current?.querySelector<HTMLElement>('.ql-editor');
    if (editor) {
      editor.style.fontSize = `${(TEXT_BASE_FONT_SIZE * textScale) / 100}px`;
    }
  }, [textScale]);

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
      {!disableToolbar && visualZoom && (
        <div className="sk-texteditor-scale pr-3" data-scale-controls>
          <button
            type="button"
            className="sk-texteditor-scale-button relative"
            aria-label="Zooma ut"
            disabled={!!readOnly || textScale <= TEXT_SCALE_MIN}
            onClick={decreaseScale}
          >
            <Minus size={20} />
            <span className="tooltip-container">
              <Tooltip position="below">Zooma ut</Tooltip>
            </span>
          </button>
          <span className="sk-texteditor-scale-label" aria-live="polite">
            {textScale}%
          </span>
          <button
            type="button"
            className="sk-texteditor-scale-button relative"
            aria-label="Zooma in"
            disabled={!!readOnly || textScale >= TEXT_SCALE_MAX}
            onClick={increaseScale}
          >
            <Plus size={20} />
            <span className="tooltip-container">
              <Tooltip position="below">Zooma in</Tooltip>
            </span>
          </button>
        </div>
      )}
    </div>
  );
});

TextEditor.displayName = 'TextEditor';

export default TextEditor;
