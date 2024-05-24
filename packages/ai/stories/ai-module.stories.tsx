import { Meta } from '@storybook/react';
import { AIModule, SessionHistory } from '../src';
import { AIModuleProps } from '../src/components';
import avatarSrc from './images/qwerty-avatar.png';
import { addDays } from 'date-fns';

export default {
  title: 'AI/Komponenter/AIModule',
  component: AIModule,
  tags: ['autodocs'],
} as Meta<AIModuleProps>;

const sessions: SessionHistory = [
  { id: '1', title: 'Vem är min chef?', updatedAt: new Date() },
  { id: '2', title: 'Varför kan jag inte argumentera?', updatedAt: new Date() },
  { id: '3', title: 'Vem är min chef?', updatedAt: new Date() },
  { id: '4', title: 'Summera förra veckans nyheter', updatedAt: addDays(new Date(), 1) },
  { id: '5', title: 'Hur skapar jag en egen assistent?', updatedAt: addDays(new Date(), 1) },
  { id: '6', title: 'Vad kan du göra Qwerty?', updatedAt: addDays(new Date(), 2) },
  { id: '7', title: 'Varför heter du Qwerty?', updatedAt: addDays(new Date(), 3) },
];

export const Template = (args: AIModuleProps) => {
  return (
    <div className="w-full h-[50em] relative">
      <AIModule
        {...args}
        assistant={{
          name: 'Qwerty',
          title: 'Din AI-guide på intranätet',
          avatar: avatarSrc,
          description:
            'Din personliga AI-guide på intranätet. Svarar med glädje på frågor som rör din anställning på Sundsvalls Kommun.',
        }}
        questionsTitle="Vad kan jag hjälpa dig med?"
        questions={['Vad är Querty?', 'Jag har tappat bort mitt passerkort', 'Vilka dagar jobbar vi halvdag']}
        sessionHistory={sessions}
      ></AIModule>
    </div>
  );
};
