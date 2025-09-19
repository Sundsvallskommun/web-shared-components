export const TokenLabels: Record<string, string> = {
  bold: 'Fet',
  italic: 'Kursiv',
  underline: 'Understruken',
  strike: 'Genomstruken',
  blockquote: 'Citat',
  'code-block': 'Kodblock',
  link: 'Länk',
  image: 'Infoga bild',
  video: 'Infoga video',
  formula: 'Infoga formel',
  color: 'Textfärg',
  background: 'Bakgrundsfärg',
  font: 'Typsnitt',
  align: 'Justering',
  clean: 'Rensa formatering',

  'header-1': 'Rubrik 1',
  'header-2': 'Rubrik 2',
  'header-3': 'Rubrik 3',
  'header-4': 'Rubrik 4',
  'header-5': 'Rubrik 5',
  'header-6': 'Rubrik 6',

  'list-ordered': 'Numrerad lista',
  'list-bullet': 'Punktlista',
  'list-check': 'Checklista',

  'script-sub': 'Nedsänkt text',
  'script-super': 'Upphöjd text',

  'indent--1': 'Minska indrag',
  'indent-+1': 'Öka indrag',

  'direction-rtl': 'Höger-till-vänster',

  'size-small': 'Liten text',
  'size-large': 'Stor text',
  'size-huge': 'Mycket stor text',
};

export function getTokenFromElement(el: Element): string | null {
  const qlClass = Array.from(el.classList).find((c) => c.startsWith('ql-'));
  if (!qlClass) return null;

  const base = qlClass.replace('ql-', '');
  const value = (el as HTMLButtonElement | HTMLSelectElement).value;

  if (value) {
    return `${base}-${value}`;
  }
  return base;
}

export function getTokenLabel(token: string, fallback = 'Button'): string {
  return TokenLabels[token] ?? fallback;
}
