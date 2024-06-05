import { Meta } from '@storybook/react';
import { SessionHistory } from '../src';
import { AIModuleSessions } from '../src/components';
import { AIModuleSessionsProps } from '../src/components/ai-module/ai-module-sessions';
import { addDays } from 'date-fns';

export default {
  title: 'AI/Komponenter/AIModuleSessions',
  component: AIModuleSessions,
  tags: ['autodocs'],
} as Meta<AIModuleSessionsProps>;

const sessions: SessionHistory = [
  { id: '1', name: 'Vem är min chef?', updated_at: new Date(), created_at: new Date(), history: [] },
  { id: '2', name: 'Varför kan jag inte argumentera?', updated_at: new Date(), created_at: new Date(), history: [] },
  { id: '3', name: 'Vem är min chef?', updated_at: new Date(), created_at: new Date(), history: [] },
  {
    id: '4',
    name: 'Summera förra veckans nyheter',
    updated_at: addDays(new Date(), -1),
    created_at: addDays(new Date(), -1),
    history: [],
  },
  {
    id: '5',
    name: 'Hur skapar jag en egen assistent?',
    updated_at: addDays(new Date(), -1),
    created_at: addDays(new Date(), -1),
    history: [],
  },
  {
    id: '6',
    name: 'Vad kan du göra Qwerty?',
    updated_at: addDays(new Date(), -2),
    created_at: addDays(new Date(), -2),
    history: [],
  },
  {
    id: '7',
    name: 'Varför heter du Qwerty?',
    updated_at: addDays(new Date(), -3),
    created_at: addDays(new Date(), -3),
    history: [],
  },
];

export const Template = (args: AIModuleSessionsProps) => {
  return (
    <div className="w-full h-[50em] relative">
      <AIModuleSessions {...args} sessions={sessions} current="" />
    </div>
  );
};
