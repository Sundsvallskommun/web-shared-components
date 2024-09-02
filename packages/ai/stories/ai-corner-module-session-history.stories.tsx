import { Meta } from '@storybook/react';
import { SessionHistory } from '../src';
import { AICornerModuleSessionHistory } from '../src/components';

export default {
  title: 'AI/Komponenter/AICornerModule/SessionHistory',
  component: AICornerModuleSessionHistory,
  tags: ['autodocs'],
} as Meta<typeof AICornerModuleSessionHistory>;

const sessions: SessionHistory = [
  { id: '1', name: 'Vem är min chef?', updated_at: new Date(), created_at: new Date(), history: [] },
  { id: '2', name: 'Varför kan jag inte argumentera?', updated_at: new Date(), created_at: new Date(), history: [] },
  { id: '3', name: 'Vem är min chef?', updated_at: new Date(), created_at: new Date(), history: [] },
];
export const Template = (args: typeof AICornerModuleSessionHistory) => {
  return (
    <div className="w-full h-[50em] relative">
      <AICornerModuleSessionHistory {...args} title="Idag" sessions={sessions}></AICornerModuleSessionHistory>
    </div>
  );
};
