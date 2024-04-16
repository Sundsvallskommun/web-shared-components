import {cx, DefaultProps, Divider, Icon} from '@sk-web-gui/react';
import { DeltaStatic, Sources } from 'quill';
import React, {useEffect, useRef} from 'react';
import ReactQuill, { UnprivilegedEditor, Value} from 'react-quill';
const icons = ReactQuill.Quill.import("ui/icons");

export interface RichTextEditorProps extends DefaultProps, Omit<React.ComponentPropsWithRef<'div'>, 'onChange'> {
    value?: Value;
    onChange?: ((value: string, delta?: DeltaStatic, source?: Sources, editor?: UnprivilegedEditor) => void);
    readOnly?: boolean;
    errors?: boolean;
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
    errors = false,
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

    useEffect(() => {
        if (internalRef.current) {
            const editor = internalRef.current.getEditor();
            if ((editor?.keyboard as Record<string, any>)?.bindings[9]) {
                delete (editor?.keyboard as Record<string, any>)?.bindings[9];
            }
        }
    }, [internalRef]);

    const modules = {
        toolbar: {
            container: ".toolbar"
        }
    };

    const Toolbar = () => {

      icons["header"]["1"] = null;
      icons["header"]["2"] = null;
      icons["bold"] = null;
      icons["italic"] = null;
      icons["underline"] = null;
      icons["list"] = null;
      icons["image"] = null;
      icons["link"] = null;
      icons["script"] = null;
      icons["clean"] = null;

      return(
        <div className="toolbar">
          {headings && (<><span className="ql-formats">
            <button className="ql-header" value="1"> <Icon name="heading-1"/> </button>
            <button className="ql-header" value="2"> <Icon name="heading-2"/> </button>
          </span>

            <Divider orientation="vertical" className="inline mr-16"/>
          </>)}

          {textFormat && (
            <>
              <span className="ql-formats">
                <button className="ql-bold"> <Icon name="bold"/> </button>
                <button className="ql-italic"> <Icon name="italic"/> </button>
                <button className="ql-underline"> <Icon name="underline"/> </button>
              </span>

            <Divider orientation="vertical" className="inline mr-16"/>
          </>
          )}

          {list && (
            <>
              <span className="ql-formats">
                <button className="ql-list" value="bullet"> <Icon name="list"/> </button>
                <button className="ql-list" value="ordered"> <Icon name="list-ordered"/> </button>
              </span>

            <Divider orientation="vertical" className="inline mr-16"/>
          </>
          )}

          {image && (
            <>
              <span className="ql-formats">
                  <button className="ql-image"> <Icon name="image"/> </button>
              </span>
          </>
          )}

          {link && (
            <>
              <span className="ql-formats">
                  <button className="ql-link"> <Icon name="link"/> </button>
              </span>
          </>
          )}

          {script && (
            <>
              <Divider orientation="vertical" className="inline mr-16"/>

              <span className="ql-formats">
                <button className="ql-script" value="sub"> <Icon name="subscript"/> </button>
                <button className="ql-script" value="super"> <Icon name="superscript"/> </button>
              </span>
          </>
          )}

          {reset && (
            <>
              <Divider orientation="vertical" className="inline mr-16"/>

              <span className="ql-formats">
                  <button className="ql-clean"><Icon name="remove-formatting"/></button>
              </span>
          </>)
          }
        </div>
      )
    }

  return typeof document === 'undefined' ? <></> : (
    <div className={cx('sk-rich-text-editor', className)} ref={ref}>
      <p className="text-small font-bold">{label}</p>
      <Toolbar />
      <ReactQuill
        preserveWhitespace={true}
        ref={internalRef}
        readOnly={readOnly}
        className={cx(`mb-md h-[80%]`)}
        value={value}
        onChange={onChange && onChange}
        modules={modules}
      />
      </div>
    );
})

RichTextEditor.displayName = 'RichTextEditor';