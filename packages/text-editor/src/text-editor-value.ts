import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $insertNodes,
  type EditorState,
  type LexicalEditor,
} from 'lexical';

export const EXTERNAL_VALUE_UPDATE_TAG = 'sk-text-editor-external-value';
export const USER_VALUE_UPDATE_TAG = 'sk-text-editor-user-value';

const ALLOWED_ELEMENTS = new Set([
  'A',
  'B',
  'BLOCKQUOTE',
  'BR',
  'CODE',
  'EM',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'I',
  'LI',
  'OL',
  'P',
  'PRE',
  'S',
  'SPAN',
  'STRIKE',
  'STRONG',
  'SUB',
  'SUP',
  'U',
  'UL',
]);

const ELEMENTS_WITH_DANGEROUS_CONTENT = new Set([
  'EMBED',
  'IFRAME',
  'MATH',
  'NOSCRIPT',
  'OBJECT',
  'SCRIPT',
  'STYLE',
  'SVG',
  'TEMPLATE',
]);

const SAFE_LINK_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);
const EXPLICIT_PROTOCOL = /^[a-z][a-z\d+.-]*:/i;
const SAFE_COLOR = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\([\d\s.,%+-]+\)|[a-z]+)$/i;
const SAFE_FONT_FAMILY = /^[\w\s,'"-]+$/;
const SAFE_FONT_SIZE = /^(?:\d+(?:\.\d+)?(?:px|r?em|%)|small|medium|large|x-large|xx-large)$/i;

export type TextEditorStyleProperty = 'background-color' | 'color' | 'font-family' | 'font-size' | 'text-align';

export interface TextEditorValue {
  plainText?: string;
  markup?: string;
}

function isTextEditorStyleProperty(property: string): property is TextEditorStyleProperty {
  return ['background-color', 'color', 'font-family', 'font-size', 'text-align'].includes(property);
}

/** Validates one supported inline-style value without allowing additional declarations. */
export function sanitizeEditorStyleValue(property: TextEditorStyleProperty, value: string): string | null {
  const trimmedValue = value.trim();
  if (!trimmedValue) return null;

  if (property === 'color' || property === 'background-color') {
    return SAFE_COLOR.test(trimmedValue) ? trimmedValue : null;
  }
  if (property === 'font-family') {
    return SAFE_FONT_FAMILY.test(trimmedValue) ? trimmedValue : null;
  }
  if (property === 'font-size') {
    return SAFE_FONT_SIZE.test(trimmedValue) ? trimmedValue : null;
  }

  const normalizedValue = trimmedValue.toLowerCase();
  return ['left', 'center', 'right', 'justify'].includes(normalizedValue) ? normalizedValue : null;
}

function sanitizeStyle(style: string): string {
  const declarations: string[] = [];

  style.split(';').forEach((declaration) => {
    const separator = declaration.indexOf(':');
    if (separator === -1) return;

    const property = declaration.slice(0, separator).trim().toLowerCase();
    const value = declaration.slice(separator + 1).trim();
    if (!isTextEditorStyleProperty(property)) return;

    const sanitizedValue = sanitizeEditorStyleValue(property, value);
    if (sanitizedValue) declarations.push(`${property}: ${sanitizedValue}`);
  });

  return declarations.join('; ');
}

/**
 * Returns a URL only when its scheme is safe to expose in editor markup.
 * Relative URLs and fragments are intentionally supported.
 */
export function sanitizeEditorUrl(url: string): string | null {
  const trimmedUrl = url.trim();
  const normalizedForProtocolCheck = Array.from(trimmedUrl)
    .filter((character) => {
      const codePoint = character.codePointAt(0) ?? 0;
      return codePoint > 32 && (codePoint < 127 || codePoint > 159);
    })
    .join('');

  if (!normalizedForProtocolCheck) return null;
  if (!EXPLICIT_PROTOCOL.test(normalizedForProtocolCheck)) return trimmedUrl;

  const protocol = normalizedForProtocolCheck.slice(0, normalizedForProtocolCheck.indexOf(':') + 1).toLowerCase();
  return SAFE_LINK_PROTOCOLS.has(protocol) ? trimmedUrl : null;
}

export function normalizeEditorLinkInput(url: string): string | null {
  const safeUrl = sanitizeEditorUrl(url);
  if (!safeUrl) return null;

  if (
    EXPLICIT_PROTOCOL.test(safeUrl) ||
    safeUrl.startsWith('/') ||
    safeUrl.startsWith('#') ||
    safeUrl.startsWith('?') ||
    safeUrl.startsWith('.')
  ) {
    return safeUrl;
  }

  return `https://${safeUrl}`;
}

function copySafeAttributes(source: Element, target: HTMLElement): void {
  const tagName = source.tagName.toUpperCase();
  const direction = source.getAttribute('dir');
  if (direction === 'ltr' || direction === 'rtl') {
    target.setAttribute('dir', direction);
  }

  const sanitizedStyle = sanitizeStyle(source.getAttribute('style') ?? '');
  if (sanitizedStyle) {
    target.setAttribute('style', sanitizedStyle);
  }

  if (tagName === 'A') {
    const safeHref = sanitizeEditorUrl(source.getAttribute('href') ?? '');
    if (safeHref) target.setAttribute('href', safeHref);

    const title = source.getAttribute('title');
    if (title) target.setAttribute('title', title);

    const linkTarget = source.getAttribute('target');
    if (linkTarget === '_self' || linkTarget === '_blank') {
      target.setAttribute('target', linkTarget);
      if (linkTarget === '_blank') target.setAttribute('rel', 'noopener noreferrer');
    }
  }

  if (tagName === 'OL') {
    const start = source.getAttribute('start');
    if (start && /^-?\d+$/.test(start)) target.setAttribute('start', start);
  }

  if (tagName === 'LI') {
    const value = source.getAttribute('value');
    if (value && /^-?\d+$/.test(value)) target.setAttribute('value', value);

    const checked = source.getAttribute('aria-checked');
    if (checked === 'true' || checked === 'false') {
      target.setAttribute('role', 'checkbox');
      target.setAttribute('tabindex', '-1');
      target.setAttribute('aria-checked', checked);
    }
  }
}

function sanitizeNode(node: Node, document: Document): Node | DocumentFragment | null {
  if (node.nodeType === 3) return document.createTextNode(node.textContent ?? '');
  if (node.nodeType !== 1) return null;

  const source = node as Element;
  const tagName = source.tagName.toUpperCase();
  if (ELEMENTS_WITH_DANGEROUS_CONTENT.has(tagName)) return null;

  if (!ALLOWED_ELEMENTS.has(tagName)) {
    const fragment = document.createDocumentFragment();
    Array.from(source.childNodes).forEach((child) => {
      const sanitizedChild = sanitizeNode(child, document);
      if (sanitizedChild) fragment.appendChild(sanitizedChild);
    });
    return fragment;
  }

  if (tagName === 'A' && !sanitizeEditorUrl(source.getAttribute('href') ?? '')) {
    const fragment = document.createDocumentFragment();
    Array.from(source.childNodes).forEach((child) => {
      const sanitizedChild = sanitizeNode(child, document);
      if (sanitizedChild) fragment.appendChild(sanitizedChild);
    });
    return fragment;
  }

  const target = document.createElement(tagName.toLowerCase());
  copySafeAttributes(source, target);
  Array.from(source.childNodes).forEach((child) => {
    const sanitizedChild = sanitizeNode(child, document);
    if (sanitizedChild) target.appendChild(sanitizedChild);
  });

  if (tagName === 'SPAN' && target.attributes.length === 0) {
    const fragment = document.createDocumentFragment();
    while (target.firstChild) fragment.appendChild(target.firstChild);
    return fragment;
  }

  return target;
}

/** Sanitizes both imported and exported rich-text HTML against a strict allowlist. */
export function sanitizeEditorHtml(html: string): string {
  if (typeof DOMParser === 'undefined') return '';

  const document = new DOMParser().parseFromString(html, 'text/html');
  const output = document.createElement('div');

  Array.from(document.body.childNodes).forEach((child) => {
    const sanitizedChild = sanitizeNode(child, document);
    if (sanitizedChild) output.appendChild(sanitizedChild);
  });

  return output.innerHTML;
}

function withTerminalNewline(text: string): string {
  return text.endsWith('\n') ? text : `${text}\n`;
}

function readActiveEditorValue(editor: LexicalEditor): Required<TextEditorValue> {
  return {
    plainText: withTerminalNewline($getRoot().getTextContent()),
    markup: sanitizeEditorHtml($generateHtmlFromNodes(editor, null)),
  };
}

export function readTextEditorValue(editor: LexicalEditor, editorState?: EditorState): Required<TextEditorValue> {
  if (editorState) {
    return editorState.read(() => readActiveEditorValue(editor), { editor });
  }

  return editor.read(() => readActiveEditorValue(editor));
}

function setMarkupValue(editor: LexicalEditor, markup: string): void {
  const document = new DOMParser().parseFromString(sanitizeEditorHtml(markup), 'text/html');
  const nodes = $generateNodesFromDOM(editor, document);
  const root = $getRoot();
  root.clear();
  root.select();
  $insertNodes(nodes);
  if (root.getChildrenSize() === 0) root.append($createParagraphNode());
}

function setPlainTextValue(plainText: string): void {
  const root = $getRoot();
  root.clear();

  const normalizedText = plainText.replace(/\r\n?/g, '\n').replace(/\n$/, '');
  normalizedText.split('\n').forEach((line) => {
    root.append($createParagraphNode().append($createTextNode(line)));
  });

  if (root.getChildrenSize() === 0) root.append($createParagraphNode());
}

export function replaceTextEditorValue(
  editor: LexicalEditor,
  value: TextEditorValue,
  tag = EXTERNAL_VALUE_UPDATE_TAG
): void {
  editor.update(
    () => {
      if (value.markup !== undefined && typeof DOMParser !== 'undefined') {
        setMarkupValue(editor, value.markup);
      } else if (value.plainText !== undefined) {
        setPlainTextValue(value.plainText);
      }
    },
    { discrete: true, tag }
  );
}
