# Text editor

An accessible rich-text editor with portable, sanitized HTML output. The public API is owned by `@sk-web-gui/text-editor` and does not expose the underlying editor engine.

## Installation

```sh
yarn add @sk-web-gui/text-editor
```

## Basic usage

```tsx
import { TextEditor, type TextEditorValue } from '@sk-web-gui/text-editor';
import { useState } from 'react';

export function DescriptionEditor() {
  const [value, setValue] = useState<TextEditorValue>({ markup: '<p>Beskrivning</p>' });

  return <TextEditor name="description" value={value} onChange={(event) => setValue(event.target.value)} />;
}
```

`markup` takes precedence when both `markup` and `plainText` are supplied. Imported markup, pasted markup and exported markup all pass through the same strict allowlist. Script elements, event-handler attributes and unsafe URL schemes such as `javascript:` and `data:` are removed.

## Ref and callbacks

The ref exposes a stable `TextEditorHandle` with `focus`, `blur`, `clear`, `getValue`, `setValue` and `getRootElement`. It does not expose engine internals.

```tsx
const editor = useRef<TextEditorHandle>(null);

<TextEditor
  ref={editor}
  onTextChange={({ value, previousValue, source }) => {
    console.log({ value, previousValue, source });
  }}
  onSelectionChange={({ selection }) => {
    console.log(selection?.text);
  }}
/>;
```

The default toolbar provides headings, bold, italic, underline, ordered and unordered lists, and safe links. `readOnly`, `disableToolbar`, custom `toolbar` groups and the visual-only `visualZoom` controls are also supported.

## Migrating from the Quill-based editor

The former `image`, `video` and `formula` toolbar tokens have been removed. Those embeds could carry engine-specific or executable markup that cannot be preserved by the editor's portable HTML allowlist. Existing consumers should upload or render media outside `TextEditor`, store a safe URL, and insert a normal link where an in-editor reference is needed. Formulas should be stored as sanitized text or rendered by a dedicated component outside the editor.

Do not pass raw embed HTML as `markup`: unsupported elements and their executable content are intentionally removed. Removing these toolbar tokens, replacing the Quill ref and callback types, and moving to the engine-neutral API are breaking changes. The next release of `@sk-web-gui/text-editor` that contains this migration must therefore be a major release.
