import { Meta } from '@storybook/react';
import { SessionHistory } from '../src';
import { AICornerModuleSessions } from '../src/components';
import { AICornerModuleSessionsProps } from '../src/components/ai-corner-module/ai-corner-module-sessions';
import { addDays } from 'date-fns';

export default {
  title: 'AI/Komponenter/AICornerModule/Sessions',
  component: AICornerModuleSessions,
  tags: ['autodocs'],
} as Meta<AICornerModuleSessionsProps>;

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

export const Template = (args: AICornerModuleSessionsProps) => {
  return (
    <div className="w-full h-[50em] relative">
      <AICornerModuleSessions {...args} sessions={sessions} current="" />
    </div>
  );
};
