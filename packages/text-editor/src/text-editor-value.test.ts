import { describe, expect, it } from 'vitest';
import {
  normalizeEditorLinkInput,
  sanitizeEditorHtml,
  sanitizeEditorStyleValue,
  sanitizeEditorUrl,
} from './text-editor-value';

describe('sanitizeEditorHtml', () => {
  it('removes executable elements, event handlers and unsafe URL schemes', () => {
    const unsafeMarkup = [
      '<p onclick="alert(1)">Safe',
      '<script>alert(1)</script>',
      '<svg><script>alert(2)</script></svg>',
      '<img src="x" onerror="alert(3)">',
      '<a href="java&#x73;cript:alert(4)" onmouseover="alert(5)">Unsafe link</a>',
      '</p>',
    ].join('');

    expect(sanitizeEditorHtml(unsafeMarkup)).toBe('<p>SafeUnsafe link</p>');
  });

  it('keeps portable rich-text markup and hardens links opened in a new tab', () => {
    const markup =
      '<h2>Heading</h2><ul><li><strong>Item</strong></li></ul>' +
      '<p><a href="https://www.sundsvall.se/path" target="_blank" rel="opener">Website</a></p>';

    expect(sanitizeEditorHtml(markup)).toBe(
      '<h2>Heading</h2><ul><li><strong>Item</strong></li></ul>' +
        '<p><a href="https://www.sundsvall.se/path" target="_blank" rel="noopener noreferrer">Website</a></p>'
    );
  });

  it('only keeps the explicitly supported style declarations', () => {
    const markup =
      '<p style="position:fixed; background-image:url(https://example.com/track); text-align:center">' +
      '<span style="font-size: 1.5em; color: #005595; font-family: Arial, sans-serif">Text</span></p>';

    expect(sanitizeEditorHtml(markup)).toBe(
      '<p style="text-align: center"><span style="font-size: 1.5em; color: #005595; font-family: Arial, sans-serif">Text</span></p>'
    );
  });

  it('preserves checklist semantics without editor-engine attributes', () => {
    const markup =
      '<ul class="engine-list" data-engine-list="check"><li aria-checked="false" role="presentation" tabindex="3">Task</li></ul>';

    expect(sanitizeEditorHtml(markup)).toBe(
      '<ul><li role="checkbox" tabindex="-1" aria-checked="false">Task</li></ul>'
    );
  });
});

describe('editor link URLs', () => {
  it.each([
    'javascript:alert(1)',
    'java\nscript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)',
  ])('rejects the unsafe URL %s', (url) => {
    expect(sanitizeEditorUrl(url)).toBeNull();
  });

  it.each([
    'https://www.sundsvall.se',
    'http://www.sundsvall.se',
    'mailto:kommunen@sundsvall.se',
    'tel:+4660191000',
    '/relative/path',
    '#section',
  ])('accepts the safe URL %s', (url) => {
    expect(sanitizeEditorUrl(url)).toBe(url);
  });

  it('adds https to a hostname entered in the link toolbar', () => {
    expect(normalizeEditorLinkInput('www.sundsvall.se')).toBe('https://www.sundsvall.se');
  });
});

describe('editor toolbar style values', () => {
  it('accepts supported values and normalizes alignment', () => {
    expect(sanitizeEditorStyleValue('color', '#005595')).toBe('#005595');
    expect(sanitizeEditorStyleValue('font-family', 'Arial, sans-serif')).toBe('Arial, sans-serif');
    expect(sanitizeEditorStyleValue('font-size', '1.5em')).toBe('1.5em');
    expect(sanitizeEditorStyleValue('text-align', ' RIGHT ')).toBe('right');
  });

  it.each([
    ['font-family', 'Arial; position: fixed'],
    ['color', 'red; background-image: url(https://example.com/track)'],
    ['background-color', 'url(https://example.com/track)'],
    ['font-size', '16px; inset: 0'],
  ] as const)('rejects additional or unsupported declarations for %s', (property, value) => {
    expect(sanitizeEditorStyleValue(property, value)).toBeNull();
  });
});
