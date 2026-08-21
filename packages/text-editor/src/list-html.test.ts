import { describe, expect, it } from 'vitest';
import { htmlToQuillList, quillListToHtml } from './list-html';

describe('TextEditor list serialization', () => {
  it('converts mixed Quill list types to portable HTML', () => {
    const quillHtml =
      '<ol><li data-list="bullet"><span class="ql-ui"></span>First</li><li data-list="ordered"><span class="ql-ui"></span>Second</li></ol>';

    expect(quillListToHtml(quillHtml)).toBe('<ul><li>First</li></ul><ol><li>Second</li></ol>');
  });

  it('converts portable lists to Quill list attributes', () => {
    const html = '<ul><li>First</li></ul><ol><li>Second</li></ol>';

    expect(htmlToQuillList(html)).toBe(
      '<ol><li data-list="bullet">First</li></ol><ol><li data-list="ordered">Second</li></ol>'
    );
  });
});
