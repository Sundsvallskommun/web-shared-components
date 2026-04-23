import { ChatEntryReference } from '../types';

export const INLINE_REFERENCE_LINK_PREFIX = '/__sk-inline-reference__/';
const INLINE_REFERENCE_REGEX = /<inref\s+id=(["'])(.*?)\1\s*\/>/g;

export interface UsedInlineReference {
  number: number;
  reference: ChatEntryReference;
}

const getInlineReferenceIdMatches = (text: string) => {
  return Array.from(text.matchAll(INLINE_REFERENCE_REGEX), (match) => match[2]);
};

const getReferenceForInlineId = (inlineId: string, references: ChatEntryReference[] = []) => {
  return references.find((reference) => reference.id === inlineId) ??
    references.find((reference) => reference.id.startsWith(inlineId));
};

export const hasRenderableInlineReferences = (text: string, references: ChatEntryReference[] = []) => {
  return getUsedInlineReferences(text, references).length > 0;
};

export const getUsedInlineReferences = (text: string, references: ChatEntryReference[] = []): UsedInlineReference[] => {
  const usedReferences: UsedInlineReference[] = [];
  const referenceNumbers = new Map<string, number>();

  getInlineReferenceIdMatches(text).forEach((inlineId) => {
    const reference = getReferenceForInlineId(inlineId, references);

    if (!reference || referenceNumbers.has(reference.id)) {
      return;
    }

    const number = usedReferences.length + 1;
    referenceNumbers.set(reference.id, number);
    usedReferences.push({ number, reference });
  });

  return usedReferences;
};

export const prepareTextWithInlineReferences = (
  text: string,
  references: ChatEntryReference[] = [],
  showReferences: boolean = true
) => {
  if (!showReferences) {
    return text.replace(INLINE_REFERENCE_REGEX, '');
  }

  const usedReferences = getUsedInlineReferences(text, references);
  const referenceNumbers = new Map(usedReferences.map(({ number, reference }) => [reference.id, number]));

  return text.replace(INLINE_REFERENCE_REGEX, (_match, _quote, inlineId: string) => {
    const reference = getReferenceForInlineId(inlineId, references);

    if (!reference) {
      return '';
    }

    const number = referenceNumbers.get(reference.id);

    return `[${number}](${INLINE_REFERENCE_LINK_PREFIX}${encodeURIComponent(reference.id)})`;
  });
};
