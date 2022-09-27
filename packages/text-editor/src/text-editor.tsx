import { __DEV__ } from '@sk-web-gui/utils';
import { DeltaStatic, Sources } from 'quill';
import ReactQuill, { Value, UnprivilegedEditor } from 'react-quill';

type propTypes = {
  theme: string;
  value: Value;
  onChange: ((value: string, delta: DeltaStatic, source: Sources, editor: UnprivilegedEditor) => void) | undefined;
  advanced: boolean;
};

export const TextEditor = (props: propTypes) => {
  const { theme, value, onChange, advanced = false } = props;

  const simpleOptions = [
    [{ header: 1 }],
    [{ header: 2 }],
    ['bold'],
    ['italic'],
    [{ list: 'bullet' }],
    [{ list: 'ordered' }],
  ];

  const advancedOptions = [
    [{ header: 1 }, { header: 2 }], // custom button values
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'bullet' }],
    [{ list: 'ordered' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ['clean'], // remove formatting button
  ];

  const modules = {
    toolbar: advanced ? advancedOptions : simpleOptions,
  };

  return <ReactQuill theme={theme} value={value} onChange={onChange} modules={modules} />;
};
