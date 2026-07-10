import { $isLinkNode, $toggleLink } from '@lexical/link';
import {
  $isListNode,
  $removeList,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  type ListType as LexicalListType,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
  type HeadingTagType,
} from '@lexical/rich-text';
import {
  $forEachSelectedTextNode,
  $getSelectionStyleValueForProperty,
  $patchStyleText,
  $setBlocksType,
} from '@lexical/selection';
import { $createCodeNode, $isCodeNode } from '@lexical/code';
import Tooltip from '@sk-web-gui/tooltip';
import {
  $createParagraphNode,
  $findMatchingParent,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $setSelection,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  type ElementFormatType,
  type LexicalEditor,
  type RangeSelection,
  type TextFormatType,
} from 'lexical';
import {
  ALargeSmall,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Braces,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Highlighter,
  IndentDecrease,
  IndentIncrease,
  Italic,
  Link,
  List,
  ListChecks,
  ListOrdered,
  PaintBucket,
  Pilcrow,
  Quote,
  RemoveFormatting,
  Strikethrough,
  Subscript,
  Superscript,
  Type,
  Underline,
} from 'lucide-react';
import {
  type FormEvent,
  type MouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { getTokenLabel } from './tooltip-text';
import {
  normalizeEditorLinkInput,
  sanitizeEditorStyleValue,
  sanitizeEditorUrl,
  type TextEditorStyleProperty,
  USER_VALUE_UPDATE_TAG,
} from './text-editor-value';
import {
  getToolbarGroups,
  type AlignOption,
  type ListType,
  type SizeOption,
  type ToolbarConfig,
  type ToolbarTokenRecord,
} from './toolbar';

interface ToolbarState {
  align: ElementFormatType;
  backgroundColor: string;
  block: 'paragraph' | 'blockquote' | 'code-block' | `h${number}`;
  color: string;
  direction: 'ltr' | 'rtl' | null;
  fontFamily: string;
  fontSize: string;
  formats: Set<TextFormatType>;
  linkUrl: string;
  list: LexicalListType | null;
}

const INITIAL_TOOLBAR_STATE: ToolbarState = {
  align: '',
  backgroundColor: '',
  block: 'paragraph',
  color: '',
  direction: null,
  fontFamily: '',
  fontSize: '',
  formats: new Set(),
  linkUrl: '',
  list: null,
};

const INLINE_FORMATS = new Set<TextFormatType>([
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'subscript',
  'superscript',
  'code',
]);

interface TextEditorToolbarProps {
  disabled: boolean;
  toolbar?: ToolbarConfig;
}

interface ToolbarButtonProps {
  active?: boolean;
  children: ReactNode;
  disabled: boolean;
  label: string;
  onClick: () => void;
}

function ToolbarButton({ active, children, disabled, label, onClick }: ToolbarButtonProps) {
  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <button
      type="button"
      className={
        active ? 'sk-texteditor-toolbar-button sk-texteditor-toolbar-button-active' : 'sk-texteditor-toolbar-button'
      }
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onClick={onClick}
    >
      {children}
      <span className="tooltip-container">
        <Tooltip position="below">{label}</Tooltip>
      </span>
    </button>
  );
}

function readToolbarState(): ToolbarState {
  const selection = $getSelection();
  if (!$isRangeSelection(selection)) return INITIAL_TOOLBAR_STATE;

  const formats = new Set<TextFormatType>();
  INLINE_FORMATS.forEach((format) => {
    if (selection.hasFormat(format)) formats.add(format);
  });

  const anchorNode = selection.anchor.getNode();
  const topLevelNode = anchorNode.getTopLevelElement();
  const listNode = $isListNode(anchorNode) ? anchorNode : $findMatchingParent(anchorNode, $isListNode);
  const linkNode = $isLinkNode(anchorNode) ? anchorNode : $findMatchingParent(anchorNode, $isLinkNode);

  let block: ToolbarState['block'] = 'paragraph';
  if ($isHeadingNode(topLevelNode)) block = topLevelNode.getTag();
  else if ($isQuoteNode(topLevelNode)) block = 'blockquote';
  else if ($isCodeNode(topLevelNode)) block = 'code-block';

  return {
    align: $isElementNode(topLevelNode) ? topLevelNode.getFormatType() : '',
    backgroundColor: $getSelectionStyleValueForProperty(selection, 'background-color', ''),
    block,
    color: $getSelectionStyleValueForProperty(selection, 'color', ''),
    direction: $isElementNode(topLevelNode) ? topLevelNode.getDirection() : null,
    fontFamily: $getSelectionStyleValueForProperty(selection, 'font-family', ''),
    fontSize: $getSelectionStyleValueForProperty(selection, 'font-size', ''),
    formats,
    linkUrl: linkNode?.getURL() ?? '',
    list: listNode?.getListType() ?? null,
  };
}

function runUserUpdate(editor: LexicalEditor, update: () => void): void {
  editor.update(update, { tag: USER_VALUE_UPDATE_TAG });
}

function getSizeStyle(size: SizeOption): string | null {
  if (size === 'small') return '0.75em';
  if (size === 'large') return '1.5em';
  if (size === 'huge') return '2.5em';
  return null;
}

function getControlLabel(format: string, value?: unknown): string {
  const token = value === undefined || value === false || value === '' ? format : `${format}-${String(value)}`;
  return getTokenLabel(token, format);
}

function getControlIcon(format: string, value?: unknown): ReactNode {
  if (format === 'bold') return <Bold />;
  if (format === 'italic') return <Italic />;
  if (format === 'underline') return <Underline />;
  if (format === 'strike') return <Strikethrough />;
  if (format === 'blockquote') return <Quote />;
  if (format === 'code-block') return <Braces />;
  if (format === 'link') return <Link />;
  if (format === 'clean') return <RemoveFormatting />;
  if (format === 'list' && value === 'ordered') return <ListOrdered />;
  if (format === 'list' && value === 'check') return <ListChecks />;
  if (format === 'list') return <List />;
  if (format === 'script' && value === 'sub') return <Subscript />;
  if (format === 'script') return <Superscript />;
  if (format === 'indent' && value === '-1') return <IndentDecrease />;
  if (format === 'indent') return <IndentIncrease />;
  if (format === 'direction') return <Pilcrow />;
  if (format === 'align' && value === 'center') return <AlignCenter />;
  if (format === 'align' && value === 'right') return <AlignRight />;
  if (format === 'align' && value === 'justify') return <AlignJustify />;
  if (format === 'align') return <AlignLeft />;
  if (format === 'size') return <ALargeSmall />;
  if (format === 'color') return <PaintBucket />;
  if (format === 'background') return <Highlighter />;
  if (format === 'font') return <Type />;
  if (format === 'header' && value === 1) return <Heading1 />;
  if (format === 'header' && value === 2) return <Heading2 />;
  if (format === 'header' && value === 3) return <Heading3 />;
  if (format === 'header' && value === 4) return <Heading4 />;
  if (format === 'header' && value === 5) return <Heading5 />;
  if (format === 'header' && value === 6) return <Heading6 />;
  return <Pilcrow />;
}

function getTokenEntry(token: ToolbarTokenRecord): [string, unknown] {
  return typeof token === 'string' ? [token, undefined] : (Object.entries(token)[0] as [string, unknown]);
}

export function TextEditorToolbar({ disabled, toolbar }: TextEditorToolbarProps) {
  const [editor] = useLexicalComposerContext();
  const [toolbarState, setToolbarState] = useState(INITIAL_TOOLBAR_STATE);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkInput, setLinkInput] = useState('');
  const [linkError, setLinkError] = useState('');
  const linkInputId = useId();
  const savedLinkSelection = useRef<RangeSelection | null>(null);

  const updateToolbar = useCallback(() => {
    editor.getEditorState().read(() => setToolbarState(readToolbarState()), { editor });
  }, [editor]);

  useEffect(() => {
    updateToolbar();
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => setToolbarState(readToolbarState()), { editor });
    });
  }, [editor, updateToolbar]);

  const applyInlineFormat = (format: TextFormatType) => {
    runUserUpdate(editor, () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) selection.formatText(format);
    });
  };

  const applyBlock = (block: ToolbarState['block']) => {
    runUserUpdate(editor, () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const nextBlock = toolbarState.block === block ? 'paragraph' : block;
      if (nextBlock === 'paragraph') $setBlocksType(selection, () => $createParagraphNode());
      else if (nextBlock === 'blockquote') $setBlocksType(selection, () => $createQuoteNode());
      else if (nextBlock === 'code-block') $setBlocksType(selection, () => $createCodeNode());
      else $setBlocksType(selection, () => $createHeadingNode(nextBlock as HeadingTagType));
    });
  };

  const applyList = (listType: ListType) => {
    runUserUpdate(editor, () => {
      const lexicalType = listType === 'ordered' ? 'number' : listType;
      if (toolbarState.list === lexicalType) {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      } else if (listType === 'ordered') {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      } else if (listType === 'check') {
        editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
      } else {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      }
    });
  };

  const applyStyle = (property: TextEditorStyleProperty, value: string | null) => {
    const sanitizedValue = value === null ? null : sanitizeEditorStyleValue(property, value);
    if (value !== null && sanitizedValue === null) return;

    runUserUpdate(editor, () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) $patchStyleText(selection, { [property]: sanitizedValue });
    });
  };

  const applyAlignment = (align: AlignOption) => {
    runUserUpdate(editor, () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      const elements = new Set(
        selection
          .getNodes()
          .map((node) => node.getTopLevelElement())
          .filter($isElementNode)
      );
      elements.forEach((element) => element.setFormat(align));
    });
  };

  const applyDirection = () => {
    runUserUpdate(editor, () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;
      const direction = toolbarState.direction === 'rtl' ? null : 'rtl';
      const elements = new Set(
        selection
          .getNodes()
          .map((node) => node.getTopLevelElement())
          .filter($isElementNode)
      );
      elements.forEach((element) => element.setDirection(direction));
    });
  };

  const clearFormatting = () => {
    runUserUpdate(editor, () => {
      let selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const selectedBlocks = new Set(
        selection
          .getNodes()
          .map((node) => node.getTopLevelElement())
          .filter($isElementNode)
      );
      selectedBlocks.forEach((element) => {
        element.setDirection(null);
        element.setFormat('');
        element.setIndent(0);
      });

      selection.setFormat(0);
      selection.setStyle('');
      $forEachSelectedTextNode((node) => node.setFormat(0).setStyle(''));
      $toggleLink(null);
      $removeList();

      selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      $setBlocksType(selection, () => $createParagraphNode());
    });
  };

  const openLinkDialog = () => {
    const selection = editor.getEditorState().read(
      () => {
        const currentSelection = $getSelection();
        return $isRangeSelection(currentSelection) ? currentSelection.clone() : null;
      },
      { editor }
    );

    if (!selection) return;
    savedLinkSelection.current = selection;
    setLinkInput(toolbarState.linkUrl);
    setLinkError('');
    setLinkDialogOpen(true);
  };

  const closeLinkDialog = () => {
    setLinkDialogOpen(false);
    setLinkError('');
    editor.focus();
  };

  const saveLink = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const safeUrl = normalizeEditorLinkInput(linkInput);
    if (!safeUrl) {
      setLinkError('Ange en säker http-, https-, e-post-, telefon- eller relativ länk.');
      return;
    }

    runUserUpdate(editor, () => {
      if (savedLinkSelection.current) $setSelection(savedLinkSelection.current.clone());
      $toggleLink(safeUrl);
    });
    closeLinkDialog();
  };

  const removeLink = () => {
    runUserUpdate(editor, () => {
      if (savedLinkSelection.current) $setSelection(savedLinkSelection.current.clone());
      $toggleLink(null);
    });
    closeLinkDialog();
  };

  const runControl = (format: string, value: unknown) => {
    if (['bold', 'italic', 'underline'].includes(format)) applyInlineFormat(format as TextFormatType);
    else if (format === 'strike') applyInlineFormat('strikethrough');
    else if (format === 'script') applyInlineFormat(value === 'sub' ? 'subscript' : 'superscript');
    else if (format === 'blockquote' || format === 'code-block') applyBlock(format);
    else if (format === 'header') {
      applyBlock(value ? (`h${String(value)}` as ToolbarState['block']) : 'paragraph');
    } else if (format === 'list') applyList(value as ListType);
    else if (format === 'link') openLinkDialog();
    else if (format === 'clean') clearFormatting();
    else if (format === 'indent') {
      runUserUpdate(editor, () => {
        editor.dispatchCommand(value === '-1' ? OUTDENT_CONTENT_COMMAND : INDENT_CONTENT_COMMAND, undefined);
      });
    } else if (format === 'direction') applyDirection();
    else if (format === 'align') applyAlignment((value ?? '') as AlignOption);
    else if (format === 'size') applyStyle('font-size', getSizeStyle(value as SizeOption));
    else if (format === 'font') applyStyle('font-family', value ? String(value) : null);
    else if (format === 'color') applyStyle('color', value ? String(value) : null);
    else if (format === 'background') applyStyle('background-color', value ? String(value) : null);
  };

  const isActive = (format: string, value: unknown): boolean => {
    if (['bold', 'italic', 'underline'].includes(format)) return toolbarState.formats.has(format as TextFormatType);
    if (format === 'strike') return toolbarState.formats.has('strikethrough');
    if (format === 'script') return toolbarState.formats.has(value === 'sub' ? 'subscript' : 'superscript');
    if (format === 'header') return toolbarState.block === `h${String(value)}`;
    if (format === 'blockquote' || format === 'code-block') return toolbarState.block === format;
    if (format === 'list') return toolbarState.list === (value === 'ordered' ? 'number' : value);
    if (format === 'link') return Boolean(toolbarState.linkUrl);
    if (format === 'direction') return toolbarState.direction === 'rtl';
    if (format === 'align') return toolbarState.align === value;
    if (format === 'color') return toolbarState.color === value;
    if (format === 'background') return toolbarState.backgroundColor === value;
    return false;
  };

  const selectValue = (format: string): string => {
    if (format === 'header') return toolbarState.block.startsWith('h') ? toolbarState.block.slice(1) : '';
    if (format === 'align') return toolbarState.align;
    if (format === 'size') return toolbarState.fontSize;
    if (format === 'font') return toolbarState.fontFamily;
    if (format === 'color') return toolbarState.color;
    if (format === 'background') return toolbarState.backgroundColor;
    return '';
  };

  const getOptionValue = (format: string, value: unknown): string => {
    if (format === 'size') return getSizeStyle(value as SizeOption) ?? '';
    return value === false ? '' : String(value);
  };

  return (
    <div
      className={disabled ? 'sk-texteditor-toolbar sk-texteditor-toolbar-disabled' : 'sk-texteditor-toolbar'}
      role="toolbar"
      aria-label="Textformatering"
    >
      {getToolbarGroups(toolbar).map((group, groupIndex) => (
        <span className="sk-texteditor-toolbar-group" key={groupIndex}>
          {group.map((token, tokenIndex) => {
            const [format, value] = getTokenEntry(token);
            if (Array.isArray(value)) {
              return (
                <select
                  className="sk-texteditor-toolbar-select"
                  key={`${format}-${tokenIndex}`}
                  aria-label={getControlLabel(format)}
                  disabled={disabled}
                  value={selectValue(format)}
                  onChange={(event) => {
                    const selected = value.find((option) => getOptionValue(format, option) === event.target.value);
                    runControl(format, selected);
                  }}
                >
                  {value.map((option) => (
                    <option key={getOptionValue(format, option)} value={getOptionValue(format, option)}>
                      {getControlLabel(format, option)}
                    </option>
                  ))}
                </select>
              );
            }

            return (
              <ToolbarButton
                key={`${format}-${String(value)}-${tokenIndex}`}
                active={isActive(format, value)}
                disabled={disabled}
                label={getControlLabel(format, value)}
                onClick={() => runControl(format, value)}
              >
                {getControlIcon(format, value)}
              </ToolbarButton>
            );
          })}
          {groupIndex < getToolbarGroups(toolbar).length - 1 && (
            <span className="sk-texteditor-toolbar-divider" role="separator" />
          )}
        </span>
      ))}

      {linkDialogOpen && (
        <form className="sk-texteditor-link-editor" aria-label="Redigera länk" onSubmit={saveLink}>
          <label htmlFor={linkInputId}>Länkadress</label>
          <input
            id={linkInputId}
            type="text"
            inputMode="url"
            autoFocus
            placeholder="https://www.sundsvall.se"
            value={linkInput}
            onChange={(event) => {
              setLinkInput(event.target.value);
              if (sanitizeEditorUrl(event.target.value)) setLinkError('');
            }}
          />
          {linkError && (
            <span className="sk-texteditor-link-error" role="alert">
              {linkError}
            </span>
          )}
          <span className="sk-texteditor-link-actions">
            <button type="submit">Spara</button>
            {toolbarState.linkUrl && (
              <button type="button" onClick={removeLink}>
                Ta bort
              </button>
            )}
            <button type="button" onClick={closeLinkDialog}>
              Avbryt
            </button>
          </span>
        </form>
      )}
    </div>
  );
}
