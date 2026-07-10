import { CodeNode } from '@lexical/code';
import { $generateNodesFromDOM } from '@lexical/html';
import { LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { LexicalComposer, type InitialConfigType } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import Tooltip from '@sk-web-gui/tooltip';
import { CustomOnChangeEvent, cx, DefaultProps } from '@sk-web-gui/utils';
import {
  $addUpdateTag,
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  PASTE_COMMAND,
  type EditorState,
  type LexicalEditor,
} from 'lexical';
import { Minus, Plus } from 'lucide-react';
import {
  type ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TextEditorToolbar } from './text-editor-toolbar';
import {
  EXTERNAL_VALUE_UPDATE_TAG,
  readTextEditorValue,
  replaceTextEditorValue,
  sanitizeEditorHtml,
  sanitizeEditorUrl,
  type TextEditorValue,
} from './text-editor-value';
import { type ToolbarConfig } from './toolbar';

const TEXT_SCALE_MIN = 50;
const TEXT_SCALE_MAX = 200;
const TEXT_SCALE_STEP = 10;
const TEXT_SCALE_DEFAULT = 100;
const TEXT_BASE_FONT_SIZE = 16;

export type TextEditorChangeSource = 'user' | 'external';

export interface TextEditorTextChange {
  previousValue: Required<TextEditorValue>;
  source: TextEditorChangeSource;
  value: Required<TextEditorValue>;
}

export interface TextEditorSelection {
  collapsed: boolean;
  text: string;
}

export interface TextEditorSelectionChange {
  previousSelection: TextEditorSelection | null;
  selection: TextEditorSelection | null;
  source: TextEditorChangeSource;
}

export interface TextEditorHandle {
  blur: () => void;
  clear: () => void;
  focus: () => void;
  getRootElement: () => HTMLElement | null;
  getValue: () => Required<TextEditorValue>;
  setValue: (value: TextEditorValue) => void;
}

export interface TextEditorProps extends DefaultProps {
  /** Accessible name for the editable surface. */
  'aria-label'?: string;
  name?: string;
  readOnly?: boolean;
  value?: TextEditorValue;
  disableToolbar?: boolean;
  toolbar?: ToolbarConfig;
  /** Show visual zoom controls (+/-) in the toolbar. Does not affect exported content. */
  visualZoom?: boolean;
  onTextChange?: (change: TextEditorTextChange) => void;
  onSelectionChange?: (change: TextEditorSelectionChange) => void;
  onChange?: (event: CustomOnChangeEvent<TextEditorValue, HTMLInputElement>) => void;
}

const EDITOR_THEME = {
  code: 'sk-texteditor-code',
  heading: {
    h1: 'sk-texteditor-heading-1',
    h2: 'sk-texteditor-heading-2',
    h3: 'sk-texteditor-heading-3',
    h4: 'sk-texteditor-heading-4',
    h5: 'sk-texteditor-heading-5',
    h6: 'sk-texteditor-heading-6',
  },
  link: 'sk-texteditor-link',
  list: {
    checklist: 'sk-texteditor-check-list',
    listitem: 'sk-texteditor-list-item',
    listitemChecked: 'sk-texteditor-list-item-checked',
    listitemUnchecked: 'sk-texteditor-list-item-unchecked',
    nested: { listitem: 'sk-texteditor-list-item-nested' },
    ol: 'sk-texteditor-ordered-list',
    ul: 'sk-texteditor-bullet-list',
  },
  paragraph: 'sk-texteditor-paragraph',
  quote: 'sk-texteditor-quote',
  text: {
    bold: 'sk-texteditor-bold',
    code: 'sk-texteditor-inline-code',
    italic: 'sk-texteditor-italic',
    strikethrough: 'sk-texteditor-strikethrough',
    subscript: 'sk-texteditor-subscript',
    superscript: 'sk-texteditor-superscript',
    underline: 'sk-texteditor-underline',
  },
};

const EMPTY_EDITOR_VALUE: Required<TextEditorValue> = {
  markup: '<p><br></p>',
  plainText: '\n',
};

function getChangeSource(tags: Set<string>): TextEditorChangeSource {
  return tags.has(EXTERNAL_VALUE_UPDATE_TAG) ? 'external' : 'user';
}

function valuesMatch(current: Required<TextEditorValue>, requested: TextEditorValue): boolean {
  if (requested.markup !== undefined) return current.markup === sanitizeEditorHtml(requested.markup);
  if (requested.plainText === undefined) return true;

  const requestedPlainText = requested.plainText.endsWith('\n') ? requested.plainText : `${requested.plainText}\n`;
  return current.plainText === requestedPlainText;
}

function ControlledValuePlugin({ value }: { value?: TextEditorValue }) {
  const [editor] = useLexicalComposerContext();
  const markup = value?.markup;
  const plainText = value?.plainText;

  useEffect(() => {
    const requestedValue = { markup, plainText };
    if ((markup === undefined && plainText === undefined) || valuesMatch(readTextEditorValue(editor), requestedValue)) {
      return;
    }
    replaceTextEditorValue(editor, requestedValue);
  }, [editor, markup, plainText]);

  return null;
}

function EditableStatePlugin({ readOnly }: { readOnly: boolean }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(!readOnly);
  }, [editor, readOnly]);

  return null;
}

function PasteSanitizerPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(
    () =>
      editor.registerCommand(
        PASTE_COMMAND,
        (event) => {
          if (!('clipboardData' in event) || !event.clipboardData) return false;
          const html = event.clipboardData.getData('text/html');
          if (!html) return false;

          event.preventDefault();
          const document = new DOMParser().parseFromString(sanitizeEditorHtml(html), 'text/html');
          $insertNodes($generateNodesFromDOM(editor, document));
          $addUpdateTag('sk-text-editor-sanitized-paste');
          return true;
        },
        COMMAND_PRIORITY_HIGH
      ),
    [editor]
  );

  return null;
}

function ImperativeHandlePlugin({ forwardedRef }: { forwardedRef: ForwardedRef<TextEditorHandle> }) {
  const [editor] = useLexicalComposerContext();

  useImperativeHandle(
    forwardedRef,
    () => ({
      blur: () => editor.blur(),
      clear: () => replaceTextEditorValue(editor, { plainText: '' }),
      focus: () => editor.focus(),
      getRootElement: () => editor.getRootElement(),
      getValue: () => readTextEditorValue(editor),
      setValue: (value) => replaceTextEditorValue(editor, value),
    }),
    [editor]
  );

  return null;
}

function readSelection(editorState: EditorState, editor: LexicalEditor): TextEditorSelection | null {
  return editorState.read(
    () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return null;
      return { collapsed: selection.isCollapsed(), text: selection.getTextContent() };
    },
    { editor }
  );
}

function selectionsMatch(first: TextEditorSelection | null, second: TextEditorSelection | null): boolean {
  return first?.collapsed === second?.collapsed && first?.text === second?.text;
}

function SelectionChangePlugin({ onSelectionChange }: Pick<TextEditorProps, 'onSelectionChange'>) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!onSelectionChange) return undefined;

    let previousSelection = readSelection(editor.getEditorState(), editor);
    return editor.registerUpdateListener(({ editorState, tags }) => {
      const selection = readSelection(editorState, editor);
      if (selectionsMatch(selection, previousSelection)) return;

      onSelectionChange({
        previousSelection,
        selection,
        source: getChangeSource(tags),
      });
      previousSelection = selection;
    });
  }, [editor, onSelectionChange]);

  return null;
}

type ChangePluginProps = Pick<TextEditorProps, 'name' | 'onChange' | 'onTextChange'>;

function ChangePlugin({ name, onChange, onTextChange }: ChangePluginProps) {
  const previousValue = useRef(EMPTY_EDITOR_VALUE);

  const handleChange = (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => {
    const value = readTextEditorValue(editor, editorState);
    const change: TextEditorTextChange = {
      previousValue: previousValue.current,
      source: getChangeSource(tags),
      value,
    };

    onTextChange?.(change);
    onChange?.({ target: { name: name ?? '', value } } as CustomOnChangeEvent<TextEditorValue, HTMLInputElement>);
    previousValue.current = value;
  };

  return <OnChangePlugin ignoreSelectionChange onChange={handleChange} />;
}

interface EditorPluginsProps
  extends Pick<TextEditorProps, 'name' | 'onChange' | 'onSelectionChange' | 'onTextChange' | 'value'> {
  forwardedRef: ForwardedRef<TextEditorHandle>;
  readOnly: boolean;
}

function EditorPlugins({
  forwardedRef,
  name,
  onChange,
  onSelectionChange,
  onTextChange,
  readOnly,
  value,
}: EditorPluginsProps) {
  return (
    <>
      <HistoryPlugin />
      <ListPlugin />
      <CheckListPlugin />
      <LinkPlugin validateUrl={(url) => sanitizeEditorUrl(url) !== null} />
      <ClickableLinkPlugin disabled={!readOnly} newTab />
      <PasteSanitizerPlugin />
      <EditableStatePlugin readOnly={readOnly} />
      <ControlledValuePlugin value={value} />
      <ImperativeHandlePlugin forwardedRef={forwardedRef} />
      <SelectionChangePlugin onSelectionChange={onSelectionChange} />
      <ChangePlugin name={name} onChange={onChange} onTextChange={onTextChange} />
    </>
  );
}

export const TextEditor = forwardRef<TextEditorHandle, TextEditorProps>((props, ref) => {
  const {
    'aria-label': ariaLabel = 'Textredigerare',
    name = '',
    readOnly = false,
    value,
    disableToolbar = false,
    className,
    toolbar,
    visualZoom = false,
    onTextChange,
    onSelectionChange,
    onChange,
  } = props;
  const [textScale, setTextScale] = useState(TEXT_SCALE_DEFAULT);

  const initialConfig = useMemo<InitialConfigType>(
    () => ({
      editable: !readOnly,
      namespace: 'SkWebGuiTextEditor',
      nodes: [CodeNode, HeadingNode, LinkNode, ListItemNode, ListNode, QuoteNode],
      onError: (error) => {
        throw error;
      },
      theme: EDITOR_THEME,
    }),
    [readOnly]
  );

  const decreaseScale = useCallback(() => {
    setTextScale((previousScale) => Math.max(TEXT_SCALE_MIN, previousScale - TEXT_SCALE_STEP));
  }, []);

  const increaseScale = useCallback(() => {
    setTextScale((previousScale) => Math.min(TEXT_SCALE_MAX, previousScale + TEXT_SCALE_STEP));
  }, []);

  return (
    <div className={cx(className, 'sk-texteditor')}>
      <LexicalComposer initialConfig={initialConfig}>
        {!disableToolbar && <TextEditorToolbar disabled={readOnly} toolbar={toolbar} />}
        <div
          className={cx(
            'sk-texteditor-container',
            disableToolbar && 'sk-texteditor-container-without-toolbar',
            readOnly && 'sk-texteditor-container-disabled'
          )}
        >
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="sk-texteditor-input"
                aria-label={ariaLabel}
                aria-readonly={readOnly}
                style={{ fontSize: `${(TEXT_BASE_FONT_SIZE * textScale) / 100}px` }}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <EditorPlugins
          forwardedRef={ref}
          name={name}
          onChange={onChange}
          onSelectionChange={onSelectionChange}
          onTextChange={onTextChange}
          readOnly={readOnly}
          value={value}
        />
      </LexicalComposer>

      {!disableToolbar && visualZoom && (
        <div className="sk-texteditor-scale pr-3" data-scale-controls>
          <button
            type="button"
            className="sk-texteditor-scale-button relative"
            aria-label="Zooma ut"
            disabled={readOnly || textScale <= TEXT_SCALE_MIN}
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
            disabled={readOnly || textScale >= TEXT_SCALE_MAX}
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

export type { TextEditorValue } from './text-editor-value';
export type { ToolbarConfig } from './toolbar';
export default TextEditor;
