import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { TextEditor, type TextEditorHandle } from './text-editor';

beforeAll(() => {
  Range.prototype.getBoundingClientRect = () => new DOMRect();
  Range.prototype.getClientRects = () => [] as unknown as DOMRectList;
});

async function selectEditorContents(editable: HTMLElement): Promise<void> {
  await act(async () => {
    const range = document.createRange();
    range.selectNodeContents(editable);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    document.dispatchEvent(new Event('selectionchange'));
  });
}

describe('TextEditor', () => {
  it('sanitizes controlled markup before rendering or exporting it', async () => {
    const editorRef = createRef<TextEditorHandle>();
    const onChange = vi.fn();

    render(
      <TextEditor
        ref={editorRef}
        name="description"
        value={{
          markup:
            '<h2 onclick="alert(1)">Heading</h2><script>alert(2)</script>' +
            '<p>Text <a href="javascript:alert(3)">unsafe link</a></p>',
        }}
        onChange={onChange}
      />
    );

    await waitFor(() => expect(editorRef.current?.getValue().plainText).toContain('Heading'));

    const value = editorRef.current?.getValue();
    expect(value?.markup).toContain('<h2>Heading</h2>');
    expect(value?.markup).toContain('<p>Text unsafe link</p>');
    expect(value?.markup).not.toMatch(/script|onclick|javascript:/i);
    expect(screen.getByRole('textbox')).not.toContainHTML('script');

    await waitFor(() => expect(onChange).toHaveBeenCalled());
    const lastEvent = onChange.mock.calls.at(-1)?.[0];
    expect(lastEvent.target.name).toBe('description');
    expect(lastEvent.target.value).toEqual(value);
  });

  it('sanitizes HTML paste before it reaches editor state or onChange', async () => {
    const editorRef = createRef<TextEditorHandle>();
    const onChange = vi.fn();
    render(<TextEditor ref={editorRef} disableToolbar onChange={onChange} />);

    const editable = screen.getByRole('textbox');
    editable.focus();
    const pasteEvent = new Event('paste', { bubbles: true, cancelable: true });
    Object.defineProperty(pasteEvent, 'clipboardData', {
      value: {
        getData: (type: string) =>
          type === 'text/html'
            ? '<p onmouseover="alert(1)">Pasted <a href="data:text/html,bad">content</a></p><iframe src="https://example.com"></iframe>'
            : 'Pasted content',
      },
    });

    await act(async () => {
      fireEvent(editable, pasteEvent);
    });

    await waitFor(() => expect(editorRef.current?.getValue().plainText).toContain('Pasted content'));
    const value = editorRef.current?.getValue();
    expect(value?.markup).toContain('<p>Pasted content</p>');
    expect(value?.markup).not.toMatch(/onmouseover|data:|iframe/i);

    const lastEvent = onChange.mock.calls.at(-1)?.[0];
    expect(lastEvent.target.value).toEqual(value);
  });

  it('rejects unsafe custom toolbar style values before applying them', async () => {
    const editorRef = createRef<TextEditorHandle>();
    render(
      <TextEditor
        ref={editorRef}
        value={{ markup: '<p>Styled text</p>' }}
        toolbar={[[{ font: 'Arial' }, { font: 'Arial; position: fixed; inset: 0' }]]}
      />
    );

    const editable = screen.getByRole('textbox');
    await waitFor(() => expect(editorRef.current?.getValue().plainText).toContain('Styled text'));
    await selectEditorContents(editable);

    const fontButtons = screen.getAllByRole('button', { name: 'font' });
    fireEvent.click(fontButtons[0]);
    await waitFor(() => expect(editorRef.current?.getValue().markup).toContain('font-family: Arial'));

    fireEvent.click(fontButtons[1]);
    expect(editable.innerHTML).not.toMatch(/position|inset/i);
    expect(editorRef.current?.getValue().markup).not.toMatch(/position|inset/i);
  });

  it('keeps selected text and background colors active in custom dropdowns', async () => {
    const editorRef = createRef<TextEditorHandle>();
    render(
      <TextEditor
        ref={editorRef}
        value={{ markup: '<p>Colored text</p>' }}
        toolbar={[[{ color: ['', '#005595', '#e5251b'] }, { background: ['', '#f2f2f2', '#ffec3d'] }]]}
      />
    );

    const editable = screen.getByRole('textbox');
    await waitFor(() => expect(editorRef.current?.getValue().plainText).toContain('Colored text'));
    await selectEditorContents(editable);

    const colorSelect = screen.getByRole('combobox', { name: 'Textfärg' });
    const backgroundSelect = screen.getByRole('combobox', { name: 'Bakgrundsfärg' });
    fireEvent.change(colorSelect, { target: { value: '#005595' } });
    await waitFor(() => expect(colorSelect).toHaveValue('#005595'));

    fireEvent.change(backgroundSelect, { target: { value: '#ffec3d' } });
    await waitFor(() => expect(backgroundSelect).toHaveValue('#ffec3d'));
    expect(colorSelect).toHaveValue('#005595');
    expect(editorRef.current?.getValue().markup).toContain('color: rgb(0, 85, 149)');
    expect(editorRef.current?.getValue().markup).toContain('background-color: rgb(255, 236, 61)');
  });

  it('clears inline, link, block, list, alignment and direction formatting', async () => {
    const editorRef = createRef<TextEditorHandle>();
    render(
      <TextEditor
        ref={editorRef}
        value={{
          markup:
            '<h2 dir="rtl" style="text-align: right"><a href="https://example.com"><strong>' +
            '<span style="color: red">Heading</span></strong></a></h2><ul><li><em>Item</em></li></ul>',
        }}
        toolbar={['clean']}
      />
    );

    const editable = screen.getByRole('textbox');
    await waitFor(() => expect(editorRef.current?.getValue().markup).toContain('<h2'));
    await selectEditorContents(editable);
    fireEvent.click(screen.getByRole('button', { name: 'Rensa formatering' }));

    await waitFor(() => expect(editorRef.current?.getValue().markup).toBe('<p>Heading</p><p>Item</p>'));
    expect(editable.innerHTML).not.toMatch(/href|strong|font|text-align|dir="rtl"|<h2|<[ou]l|<li/i);
  });

  it('clears block indentation', async () => {
    const editorRef = createRef<TextEditorHandle>();
    render(
      <TextEditor ref={editorRef} value={{ markup: '<p>Indented text</p>' }} toolbar={[[{ indent: '+1' }, 'clean']]} />
    );

    const editable = screen.getByRole('textbox');
    await waitFor(() => expect(editorRef.current?.getValue().plainText).toContain('Indented text'));
    await selectEditorContents(editable);
    fireEvent.click(screen.getByRole('button', { name: 'Öka indrag' }));
    await waitFor(() => expect(editable.querySelector('p')?.style.paddingInlineStart).not.toBe(''));

    fireEvent.click(screen.getByRole('button', { name: 'Rensa formatering' }));
    await waitFor(() => expect(editable.querySelector('p')?.style.paddingInlineStart).toBe(''));
    expect(editorRef.current?.getValue().markup).toBe('<p>Indented text</p>');
  });
});
