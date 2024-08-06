import { Meta } from '@storybook/react';
import { AIFeed, ChatHistory } from '../src';
import React from 'react';
import { OriginTitleMap } from '../src/types/titles';

export default {
  title: 'AI/Komponenter/AIFeed',
  component: AIFeed,
  tags: ['autodocs'],
} as Meta<typeof AIFeed>;

const history: ChatHistory = [
  {
    origin: 'user',
    text: 'Vad är Qwerty?',
    id: '1',
  },
  {
    origin: 'assistant',
    text: 'Jag är Qwerty, en AI-assistent här för att hjälpa medarbetare på Sundsvalls Kommun med information och kommunikation. Jag pratar enkelt och vänligt, och kan hjälpa till med frågor om HR och vårt intranät. \r\rMitt mål är att göra ditt jobb lite lättare och roligare. Hur kan jag hjälpa dig idag?',
    id: '2',
    references: [
      {
        title: 'Källa 1',
        url: '#',
      },
      {
        title: 'Källa 2',
        url: '#',
      },
      {
        title: 'Källa 3',
        url: '#',
      },
    ],
  },
  {
    origin: 'user',
    text: 'Vad är Qwerty?',
    id: '3',
  },
  {
    origin: 'assistant',
    text: 'Jag är Qwerty, en AI-assistent här för att hjälpa medarbetare på Sundsvalls Kommun med information och kommunikation. Jag pratar enkelt och vänligt, och kan hjälpa till med frågor om HR och vårt intranät. \r\rMitt mål är att göra ditt jobb lite lättare och roligare. Hur kan jag hjälpa dig idag?',
    id: '4',
    references: [
      {
        title: 'Källa 1',
        url: '#',
      },
      {
        title: 'Källa 2',
        url: '#',
      },
      {
        title: 'Källa 3',
        url: '#',
      },
    ],
  },
  {
    origin: 'user',
    text: 'Vad är Qwerty?',
    id: '5',
  },
  {
    origin: 'assistant',
    text: 'Jag är Qwerty, en AI-assistent här för att hjälpa medarbetare på Sundsvalls Kommun med information och kommunikation. Jag pratar enkelt och vänligt, och kan hjälpa till med frågor om HR och vårt intranät. \r\rMitt mål är att göra ditt jobb lite lättare och roligare. Hur kan jag hjälpa dig idag?',
    id: '6',
    done: true,
    references: [
      {
        title: 'Källa 1',
        url: '#',
      },
      {
        title: 'Källa 2',
        url: '#',
      },
      {
        title: 'Källa 3',
        url: '#',
      },
    ],
  },
];

const titles: OriginTitleMap = {
  user: { title: 'Användare' },
  assistant: { title: 'Sundsvalls AI' },
  system: { title: 'Felmeddelande' },
};

export const Template = (args: typeof AIFeed) => {
  return (
    <div className="w-full h-[50em] relative">
      <AIFeed {...args} titles={titles} history={history}></AIFeed>
    </div>
  );
};
