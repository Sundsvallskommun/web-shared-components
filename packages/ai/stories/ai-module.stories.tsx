import { Meta } from '@storybook/react';
import { AIModule, AssistantInfo, ChatHistory, SessionHistory } from '../src';
import { AIModuleProps } from '../src/components';
import avatarSrc from './images/qwerty-avatar.png';
import { addDays } from 'date-fns';

export default {
  title: 'AI/Komponenter/AIModule',
  component: AIModule,
  tags: ['autodocs'],
  args: {
    readmore: {
      url: 'https://www.sundsvall.se/AI',
      description: 'Hur Sundsvalls kommun använder artificiell intelligens (AI): www.sundsvall.se/AI',
    },
    questionsTitle: 'Vad kan jag hjälpa dig med?',
    questions: ['Vad är Querty?', 'Jag har tappat bort mitt passerkort', 'Vilka dagar jobbar vi halvdag'],
  },
} as Meta<AIModuleProps>;

const assistant: AssistantInfo = {
  name: 'Qwerty',
  title: 'Din AI-guide på intranätet',
  avatar: avatarSrc,
  description:
    'Din personliga AI-guide på intranätet. Svarar med glädje på frågor som rör din anställning på Sundsvalls Kommun.',
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

export const Template = (args: AIModuleProps) => {
  return (
    <div className="w-full h-[50em] relative">
      <AIModule {...args} assistant={assistant} sessionHistory={sessions}></AIModule>
    </div>
  );
};

export const WithHistory = (args: AIModuleProps) => {
  return (
    <div className="w-full h-[50em] relative">
      <AIModule
        {...args}
        assistant={assistant}
        questionsTitle="Vad kan jag hjälpa dig med?"
        questions={['Vad är Querty?', 'Jag har tappat bort mitt passerkort', 'Vilka dagar jobbar vi halvdag']}
        sessionHistory={sessions}
        session={sessions[0]}
      ></AIModule>
    </div>
  );
};
