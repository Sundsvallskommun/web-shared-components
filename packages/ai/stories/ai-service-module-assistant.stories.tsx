import { Meta } from '@storybook/react';
import { AssistantInfo, ChatHistory } from '../src';
import { AIServiceModule } from '../src/components';
import { type AIServiceModuleAssistantProps } from '../src/components/ai-service-module/ai-service-module-assistant';
import avatarSrc from './images/qwerty-avatar.png';

export default {
  title: 'AI/Komponenter/AIServiceModule/Assistant',
  component: AIServiceModule.Assistant,
  tags: ['autodocs'],
} as Meta<AIServiceModuleAssistantProps>;

export const Template = (args: AIServiceModuleAssistantProps) => (
  <AIServiceModule.Assistant {...args}></AIServiceModule.Assistant>
);

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
    text: 'Jag är Qwerty, en AI-assistent här för att hjälpa medarbetare på Sundsvalls Kommun med information och kommunikation. Jag pratar enkelt och vänligt, och kan hjälpa till med frågor om HR och vårt intranät. \r\rMitt mål är att göra ditt jobb lite lättare och roligare. Hur kan jag hjälpa dig idag?',
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

const assistant: AssistantInfo = {
  name: 'Qwerty',
  title: 'Din AI-guide på intranätet',
  avatar: avatarSrc,
  description:
    'Din personliga AI-guide på intranätet. Svarar med glädje på frågor som rör din anställning på Sundsvalls Kommun.',
};

export const Expanded = () => (
  <div className="h-[60rem]">
    <AIServiceModule.Assistant history={history} assistant={assistant}></AIServiceModule.Assistant>
  </div>
);
