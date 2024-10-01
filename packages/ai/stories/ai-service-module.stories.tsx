import { Meta } from '@storybook/react';
import { AIServiceModule, AIServiceModuleProps } from '../src/components';
import { AssistantInfo, AssistantSession, ChatHistory } from '../src';
import { Avatar, Icon } from '@sk-web-gui/react';
import { Sparkles } from 'lucide-react';
import avatarSrc from './images/qwerty-avatar.png';

export default {
  title: 'AI/Komponenter/AIServiceModule',
  component: AIServiceModule,
  tags: ['autodocs'],
  args: {
    questions: [
      { question: 'Can I ask in my native language?', lang: 'en' },
      'Vad är vuxenutbildning?',
      'Hur ansöker jag till en kurs?',
      'Kan jag få studievägledning?',
    ],
  },
} as Meta<AIServiceModuleProps>;

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

const session: AssistantSession = {
  id: '1',
  name: 'Vem är min chef?',
  updated_at: new Date(),
  created_at: new Date(),
  history,
};

const avatars = {
  assistant: <Avatar size="lg" initials="AI" color="vattjom" />,
  user: <Avatar size="lg" initials="DU" color="bjornstigen" />,
  system: <Avatar initials="!" color="juniskar" />,
};

export const Template = (args: AIServiceModuleProps) => (
  <AIServiceModule {...args} assistant={assistant}></AIServiceModule>
);

export const SecondaryStyle = (args: AIServiceModuleProps) => {
  return (
    <AIServiceModule
      {...args}
      headerIcon={<Icon icon={<Sparkles />} />}
      assistant={assistant}
      questions={[]}
      variant="secondary"
    >
      <p>Text som förklarar vad som kommer att ske nedan och till vilken nytta.</p>
    </AIServiceModule>
  );
};

export const ManualWithHistory = () => (
  <div className="h-[65rem]">
    <AIServiceModule.Wrapper>
      <AIServiceModule.Row color="bjornstigen">
        <AIServiceModule.Content>
          <AIServiceModule.Header>
            <h2>Kan jag hjälpa dig med något?</h2>
          </AIServiceModule.Header>
          <AIServiceModule.Assistant history={history} avatars={avatars} assistant={assistant} />
        </AIServiceModule.Content>
      </AIServiceModule.Row>
    </AIServiceModule.Wrapper>
  </div>
);
