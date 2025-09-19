export type HeaderLevel = 1 | 2 | 3 | 4 | 5 | 6 | false;
export type ListType = 'ordered' | 'bullet' | 'check';
export type ScriptType = 'sub' | 'super';
export type IndentAmount = '-1' | '+1';
export type Direction = 'rtl';
export type SizeOption = 'small' | false | 'large' | 'huge';
export type AlignOption = '' | 'center' | 'right' | 'justify';

export type ToolbarTokenSimple =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'blockquote'
  | 'code-block'
  | 'link'
  | 'image'
  | 'video'
  | 'formula'
  | 'clean';

type ToolbarRecordSingle =
  | { header: HeaderLevel }
  | { list: ListType }
  | { script: ScriptType }
  | { indent: IndentAmount }
  | { direction: Direction }
  | { size: SizeOption }
  | { align: AlignOption }
  | { font: string }
  | { color: string }
  | { background: string };

type ToolbarRecordDropdown =
  | { size: SizeOption[] }
  | { header: HeaderLevel[] }
  | { color: string[] }
  | { background: string[] }
  | { font: string[] }
  | { align: AlignOption[] };

export type ToolbarTokenRecord = ToolbarRecordSingle | ToolbarTokenSimple | ToolbarRecordDropdown;
export type ToolbarTokenNested = Array<ToolbarTokenRecord>;
export type ToolbarConfig = Array<ToolbarTokenRecord | ToolbarTokenNested>;

export const defaultToolbarTokens: ToolbarConfig = [
  [{ header: 1 }, { header: 2 }, 'bold', 'italic', 'underline'],
  [{ list: 'bullet' }, { list: 'ordered' }],
  ['link'],
];
