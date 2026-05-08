import { Meta } from '@storybook/react';
import React from 'react';
import { AIFeed, ChatHistory } from '../src';
import { OriginTitleMap } from '../src/types/titles';

export default {
  title: 'AI/Komponenter/AIFeed',
  component: AIFeed,
  tags: ['autodocs'],
} as Meta<typeof AIFeed>;

const titles: OriginTitleMap = {
  user: { title: 'Användare' },
  assistant: { title: 'Sundsvalls AI' },
  system: { title: 'Felmeddelande' },
};

const defaultHistory: ChatHistory = [
  {
    origin: 'user',
    text: 'Vad är Qwerty?',
    id: '1',
  },
  {
    origin: 'assistant',
    text:
      '## Jag är Qwerty.\r\r **En AI-assistent** här för att hjälpa medarbetare på Sundsvalls Kommun med information och kommunikation. Jag pratar enkelt och vänligt, och kan hjälpa till med frågor om HR och vårt intranät. \r\rMitt mål är att göra ditt jobb lite lättare och roligare. Hur kan jag hjälpa dig idag? \r\r## Jag kan skapa listor\r- En punkt\r- Två punkter\r\rDetta är `<p>inline code</p>`\n```\nDetta är ett \r<p>code block</p>\n```',
    id: '2',
    references: [
      {
        id: 'source-1',
        title: 'Källa 1',
        url: '#',
      },
      {
        id: 'source-2',
        title: 'Källa 2',
        url: '#',
      },
      {
        id: 'source-3',
        title: 'Källa 3',
        url: '#',
      },
      {
        id: 'source-4',
        title: 'Källa 4',
        url: '#',
      },
    ],
  },
];

const inlineReferenceHistory: ChatHistory = [
  {
    origin: 'user',
    text: 'Hur bygger man en bra accordion?',
    id: 'inline-question',
  },
  {
    origin: 'assistant',
    text:
      'En bra accordion bör följa ARIA-mönstret <inref id="810177c2"/> och använda tydliga knappetiketter. Om du vill jämföra med disclosure-beteende kan du också kika på exemplet här <inref id="69c42b47"/>. När samma källa används igen ska numret återanvändas <inref id="810177c2"/>.',
    id: 'inline-answer',
    done: true,
    references: [
      {
        id: '810177c2-abe1-4cee-acc7-370590ef7964',
        title: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
        url: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
      },
      {
        id: '69c42b47-0507-4727-bb8e-f8a796fa3140',
        title: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-card/',
        url: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-card/',
      },
    ],
  },
];

const missingUrlInlineReferenceHistory: ChatHistory = [
  {
    origin: 'user',
    text: 'Finns det inline-referenser utan länk?',
    id: 'missing-url-question',
  },
  {
    origin: 'assistant',
    text: 'Ja, en källa utan url ska fortfarande kunna öppnas <inref id="0497d7c5"/>.',
    id: 'missing-url-answer',
    done: true,
    references: [
      {
        id: '0497d7c5-b757-45f9-84ef-e67a20350c54',
        title: 'DOS-lagen',
      },
    ],
  },
];

const renderFeed = (args: React.ComponentProps<typeof AIFeed>) => {
  return (
    <div className="w-full h-[50em] relative">
      <AIFeed {...args} titles={titles} />
    </div>
  );
};

export const Template = {
  render: renderFeed,
  args: {
    history: defaultHistory,
  },
};

export const InlineReferences = {
  render: renderFeed,
  args: {
    history: inlineReferenceHistory,
  },
};

export const InlineReferencesWithoutUrl = {
  render: renderFeed,
  args: {
    history: missingUrlInlineReferenceHistory,
  },
};

export const InlineReferencesHidden = {
  render: renderFeed,
  args: {
    history: inlineReferenceHistory,
    showReferences: false,
  },
};
