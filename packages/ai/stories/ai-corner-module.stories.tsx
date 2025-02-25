import { Meta } from '@storybook/react';
import { AICornerModule, type Assistant, ChatHistory, SessionHistory } from '../src';
import { AICornerModuleProps } from '../src/components';
import qwertySrc from './images/qwerty-avatar.png';
import paragrafSrc from './images/paragrafryttaren.png';

import { addDays } from 'date-fns';
import { Avatar } from '@sk-web-gui/avatar';

export default {
  title: 'AI/Komponenter/AICornerModule',
  component: AICornerModule,
  tags: ['autodocs'],
  args: {
    readmore: {
      url: 'https://www.sundsvall.se/AI',
      description: 'Hur Sundsvalls kommun använder artificiell intelligens (AI): www.sundsvall.se/AI',
    },
    questionsTitle: 'Vad kan jag hjälpa dig med?',
    questions: ['Vad är Querty?', 'Jag har tappat bort mitt passerkort', 'Vilka dagar jobbar vi halvdag'],
  },
} as Meta<AICornerModuleProps>;

const qwerty: Assistant = {
  settings: { assistantId: '12345' },
  info: { name: 'Qwerty', title: 'Din AI-guide på intranätet', avatar: qwertySrc },
};
const paragrafryttaren: Assistant = {
  settings: { assistantId: '2345' },
  info: {
    name: 'Paragrafryttaren',
    title: 'Din AI-guide på intranätet',
    avatar: paragrafSrc,
  },
};

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
    origin: 'system',
    text: 'Något gick fel',
    id: '5',
  },
  {
    origin: 'user',
    text: 'Vad är Qwerty?',
    id: '6',
  },
  {
    origin: 'assistant',
    text: 'Jag är Qwerty, en AI-assistent här för att hjälpa medarbetare på [Sundsvalls Kommun](https://sundsvall.se) med information och kommunikation. Jag pratar enkelt och vänligt, och kan hjälpa till med frågor om HR och vårt intranät. \r\rMitt mål är att göra ditt jobb lite lättare och roligare. Hur kan jag hjälpa dig idag?',
    id: '7',
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

const sessions: SessionHistory = [
  { id: '1', name: 'Vem är min chef?', updated_at: new Date(), created_at: new Date(), history },
  { id: '2', name: 'Varför kan jag inte argumentera?', updated_at: new Date(), created_at: new Date(), history },
  { id: '3', name: 'Vem är min chef?', updated_at: new Date(), created_at: new Date(), history },
  {
    id: '4',
    name: 'Summera förra veckans nyheter',
    updated_at: addDays(new Date(), -1),
    created_at: addDays(new Date(), -1),
    history,
  },
  {
    id: '5',
    name: 'Hur skapar jag en egen assistent?',
    updated_at: addDays(new Date(), -1),
    created_at: addDays(new Date(), -1),
    history,
  },
  {
    id: '6',
    name: 'Vad kan du göra Qwerty?',
    updated_at: addDays(new Date(), -2),
    created_at: addDays(new Date(), -2),
    history,
  },
  {
    id: '7',
    name: 'Varför heter du Qwerty?',
    updated_at: addDays(new Date(), -3),
    created_at: addDays(new Date(), -3),
    history,
  },
];

const avatars = {
  assistant: <Avatar size="lg" initials="AI" color="vattjom" />,
  user: <Avatar size="lg" initials="DU" color="bjornstigen" />,
  system: <Avatar initials="!" color="juniskar" />,
};

export const Template = (args: AICornerModuleProps) => {
  return (
    <div className="w-full h-[60em] relative">
      <AICornerModule
        {...args}
        assistant={qwerty.info}
        assistants={[qwerty, paragrafryttaren]}
        sessionHistory={sessions}
      ></AICornerModule>
    </div>
  );
};

export const WithHistory = (args: AICornerModuleProps) => {
  return (
    <div className="w-full h-[60em] relative">
      <AICornerModule
        {...args}
        assistant={qwerty.info}
        avatars={avatars}
        questionsTitle="Vad kan jag hjälpa dig med?"
        questions={['Vad är Querty?', 'Jag har tappat bort mitt passerkort', 'Vilka dagar jobbar vi halvdag']}
        sessionHistory={sessions}
        session={sessions[0]}
        originTitles={{
          user: { title: 'Du', show: false },
          assistant: { title: 'Qwerty', show: true },
          system: { title: 'Fel', show: false },
        }}
      ></AICornerModule>
    </div>
  );
};
