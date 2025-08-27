export type ToolbarToken = string | Record<string, string | number>;

export const defaultToolbarTokens: ToolbarToken[][] = [
  [{ header: 1 }, { header: 2 }, 'bold', 'italic', 'underline'],
  [{ list: 'bullet' }, { list: 'ordered' }],
  ['link'],
];
