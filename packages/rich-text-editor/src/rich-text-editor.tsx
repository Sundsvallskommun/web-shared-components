import { cx, DefaultProps, Divider, Icon, Button, Tooltip } from '@sk-web-gui/react';
import { DeltaStatic, Sources } from 'quill';
import React, { useEffect, useRef } from 'react';
import ReactQuill, { UnprivilegedEditor, Value } from 'react-quill';
const icons = ReactQuill.Quill.import('ui/icons');

export interface RichTextEditorProps extends DefaultProps, Omit<React.ComponentPropsWithRef<'div'>, 'onChange'> {
  value?: Value;
  onChange?: (value: string, delta?: DeltaStatic, source?: Sources, editor?: UnprivilegedEditor) => void;
  readOnly?: boolean;
  label?: string;
  headings?: boolean;
  textFormat?: boolean;
  list?: boolean;
  image?: boolean;
  link?: boolean;
  script?: boolean;
  reset?: boolean;
}

export const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>((props, ref) => {
  const {
    value,
    className,
    onChange,
    readOnly = false,
    label = '',
    textFormat = true,
    list = true,
    link = true,
    image = true,
    headings = true,
    script = false,
    reset = false,
  } = props;

  const internalRef = useRef<ReactQuill>(null);
  type QuillEditor = typeof ReactQuill & { keyboard?: Record<string, any> };
  const [richText, setRichText] = React.useState(internalRef.current?.value);

  const initialHover = [false, false, false, false, false, false, false, false, false, false, false, false];
  const initialFocus = [false, false, false, false, false, false, false, false, false, false, false, false];
  const [hover, setHover] = React.useState<boolean[]>(initialHover);
  const [focus, setFocus] = React.useState<boolean[]>(initialFocus);
  const handleHover = (index: number) => {
    const newHover = [...initialHover];
    newHover[index] = true;
    setHover(newHover);
  };
  const handleFocus = (index: number) => {
    const newFocus = [...initialFocus];
    newFocus[index] = true;
    setFocus(newFocus);
  };

  useEffect(() => {
    if (internalRef.current) {
      const editor = internalRef.current.getEditor() as unknown as QuillEditor;
      if (editor?.keyboard?.bindings[9]) {
        // Delete key bindings for 'tab'
        delete editor?.keyboard?.bindings[9];
      }
    }
  }, [internalRef]);

  const modules = {
    toolbar: {
      container: '.sk-rich-text-editor-toolbar',
    },
  };

  const Toolbar = () => {
    icons['header']['1'] = null;
    icons['header']['2'] = null;
    icons['bold'] = null;
    icons['italic'] = null;
    icons['underline'] = null;
    icons['list'] = null;
    icons['image'] = null;
    icons['link'] = null;
    icons['script'] = null;
    icons['clean'] = null;

    return (
      <div className="sk-rich-text-editor-toolbar">
        {headings && (
          <>
            <span className="sk-rich-text-editor-toolbar-formats">
              <Button
                iconButton
                showBackground={false}
                size="sm"
                variant="tertiary"
                className="ql-header"
                /*onFocus={() => handleFocus(0)}
              onBlur={() => setFocus(initialFocus)}*/
                onMouseOver={() => handleHover(0)}
                onMouseLeave={() => setHover(initialHover)}
              >
                <Icon name="heading-1" />
                <Tooltip position="below" className={`${hover[0] || focus[0] ? 'absolute mt-[8rem]' : 'hidden'}`}>
                  Rubrik 1
                </Tooltip>
              </Button>

              <Button
                iconButton
                showBackground={false}
                size="sm"
                variant="tertiary"
                className="ql-header"
                /*onFocus={() => handleFocus(1)}
              onBlur={() => setFocus(initialFocus)}*/
                onMouseEnter={() => handleHover(1)}
                onMouseLeave={() => setHover(initialHover)}
              >
                <Icon name="heading-2" />
                <Tooltip position="below" className={`${hover[1] || focus[1] ? 'absolute mt-[8rem]' : 'hidden'}`}>
                  Rubrik 2
                </Tooltip>
              </Button>
            </span>
          </>
        )}

        {textFormat && (
          <>
            <span className="sk-rich-text-editor-toolbar-formats">
              <Button
                iconButton
                showBackground={false}
                size="sm"
                variant="tertiary"
                className="ql-bold bg-background-200"
                /*onFocus={() => handleFocus(2)}
                  onBlur={() => setFocus(initialFocus)}*/
                onMouseEnter={() => handleHover(2)}
                onMouseLeave={() => setHover(initialHover)}
              >
                <Icon name="bold" />
                <Tooltip position="below" className={`${hover[2] || focus[2] ? 'absolute mt-[8rem]' : 'hidden'}`}>
                  Fet
                </Tooltip>
              </Button>

              <Button
                iconButton
                showBackground={false}
                size="sm"
                variant="tertiary"
                className="ql-italic"
                /*onFocus={() => handleFocus(3)}
                  onBlur={() => setFocus(initialFocus)}*/
                onMouseEnter={() => handleHover(3)}
                onMouseLeave={() => setHover(initialHover)}
              >
                <Icon name="italic" />
                <Tooltip position="below" className={`${hover[3] || focus[3] ? 'absolute mt-[8rem]' : 'hidden'}`}>
                  Kursiv
                </Tooltip>
              </Button>

              <Button
                iconButton
                showBackground={false}
                size="sm"
                variant="tertiary"
                className="ql-underline"
                /*onFocus={() => handleFocus(4)}
                  onBlur={() => setFocus(initialFocus)}*/
                onMouseEnter={() => handleHover(4)}
                onMouseLeave={() => setHover(initialHover)}
              >
                <Icon name="underline" />
                <Tooltip position="below" className={`${hover[4] || focus[4] ? 'absolute mt-[8rem]' : 'hidden'}`}>
                  Understruken
                </Tooltip>
              </Button>
            </span>

            <Divider orientation="vertical" className="inline mr-16" />
          </>
        )}

        {list && (
          <>
            <span className="sk-rich-text-editor-toolbar-formats">
              <Button
                iconButton
                showBackground={false}
                size="sm"
                variant="tertiary"
                className="ql-list"
                value="bullet"
                /*onFocus={() => handleFocus(5)}
                  onBlur={() => setFocus(initialFocus)}*/
                onMouseEnter={() => handleHover(5)}
                onMouseLeave={() => setHover(initialHover)}
              >
                <Icon name="list" />
                <Tooltip position="below" className={`${hover[5] || focus[5] ? 'absolute mt-[8rem]' : 'hidden'}`}>
                  Punktlista
                </Tooltip>
              </Button>
              <Button
                iconButton
                showBackground={false}
                size="sm"
                variant="tertiary"
                className="ql-list"
                value="ordered"
                /*onFocus={() => handleFocus(6)}
                  onBlur={() => setFocus(initialFocus)}*/
                onMouseEnter={() => handleHover(6)}
                onMouseLeave={() => setHover(initialHover)}
              >
                <Icon name="list-ordered" />
                <Tooltip position="below" className={`${hover[6] || focus[6] ? 'absolute mt-[8rem]' : 'hidden'}`}>
                  Numrering
                </Tooltip>
              </Button>
            </span>

            <Divider orientation="vertical" className="inline mr-16" />
          </>
        )}

        {image && (
          <>
            <span className="sk-rich-text-editor-toolbar-formats">
              <Button
                iconButton
                showBackground={false}
                size="sm"
                variant="tertiary"
                className="ql-image"
                /*onFocus={() => handleFocus(7)}
                  onBlur={() => setFocus(initialFocus)}*/
                onMouseEnter={() => handleHover(7)}
                onMouseLeave={() => setHover(initialHover)}
              >
                <Icon name="image" />
                <Tooltip position="below" className={`${hover[7] || focus[7] ? 'absolute mt-[8rem]' : 'hidden'}`}>
                  Infoga bild
                </Tooltip>
              </Button>
            </span>
          </>
        )}

        {link && (
          <>
            <span className="sk-rich-text-editor-toolbar-formats">
              <Button
                iconButton
                showBackground={false}
                size="sm"
                variant="tertiary"
                className="ql-link"
                /*onFocus={() => handleFocus(8)}
                  onBlur={() => setFocus(initialFocus)}*/
                onMouseEnter={() => handleHover(8)}
                onMouseLeave={() => setHover(initialHover)}
              >
                <Icon name="link" />
                <Tooltip position="below" className={`${hover[8] || focus[8] ? 'absolute mt-[8rem]' : 'hidden'}`}>
                  Länk
                </Tooltip>
              </Button>
            </span>
          </>
        )}

        {script && (
          <>
            <Divider orientation="vertical" className="inline mr-16" />

            <span className="sk-rich-text-editor-toolbar-formats">
              <Button
                iconButton
                showBackground={false}
                size="sm"
                variant="tertiary"
                className="ql-script"
                value="sub"
                /*onFocus={() => handleFocus(9)}
                  onBlur={() => setFocus(initialFocus)}*/
                onMouseEnter={() => handleHover(9)}
                onMouseLeave={() => setHover(initialHover)}
              >
                <Icon name="subscript" />
                <Tooltip position="below" className={`${hover[9] || focus[9] ? 'absolute mt-[8rem]' : 'hidden'}`}>
                  Nedsänkt
                </Tooltip>
              </Button>
              <Button
                iconButton
                showBackground={false}
                size="sm"
                variant="tertiary"
                className="ql-script"
                value="super"
                /*onFocus={() => handleFocus(10)}
                  onBlur={() => setFocus(initialFocus)}*/
                onMouseEnter={() => handleHover(10)}
                onMouseLeave={() => setHover(initialHover)}
              >
                <Icon name="superscript" />
                <Tooltip position="below" className={`${hover[10] || focus[10] ? 'absolute mt-[8rem]' : 'hidden'}`}>
                  Upphöjd
                </Tooltip>
              </Button>
            </span>
          </>
        )}

        {reset && (
          <>
            <Divider orientation="vertical" className="inline mr-16" />

            <span className="sk-rich-text-editor-toolbar-formats">
              <Button
                iconButton
                showBackground={false}
                size="sm"
                variant="tertiary"
                className="ql-clean"
                /*onFocus={() => handleFocus(11)}
                  onBlur={() => setFocus(initialFocus)}*/
                onMouseEnter={() => handleHover(11)}
                onMouseLeave={() => setHover(initialHover)}
              >
                <Icon name="remove-formatting" />
                <Tooltip position="below" className={`${hover[11] || focus[11] ? 'absolute mt-[8rem]' : 'hidden'}`}>
                  Återställ formatering
                </Tooltip>
              </Button>
            </span>
          </>
        )}
      </div>
    );
  };

  return typeof document === 'undefined' ? (
    <></>
  ) : (
    <div className={cx('sk-rich-text-editor', className)} ref={ref}>
      <p className="text-small font-bold">{label}</p>
      <Toolbar />
      <ReactQuill
        preserveWhitespace={true}
        ref={internalRef}
        readOnly={readOnly}
        className={cx(`mb-md h-[80%] p-0`)}
        value={value}
        onChange={onChange && onChange}
        modules={modules}
      />
    </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';
