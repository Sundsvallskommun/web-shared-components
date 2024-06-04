import { Meta } from '@storybook/react';
import { SessionHistory } from '../src';
import { AIModuleSessionHistory } from '../src/components';

export default {
  title: 'AI/Komponenter/AIModuleSessionHistory',
  component: AIModuleSessionHistory,
  tags: ['autodocs'],
} as Meta<typeof AIModuleSessionHistory>;

const sessions: SessionHistory = [
  { id: '1', name: 'Vem är min chef?', updated_at: new Date(), created_at: new Date(), history: [] },
  { id: '2', name: 'Varför kan jag inte argumentera?', updated_at: new Date(), created_at: new Date(), history: [] },
  { id: '3', name: 'Vem är min chef?', updated_at: new Date(), created_at: new Date(), history: [] },
];
export const Template = (args: typeof AIModuleSessionHistory) => {
  return (
    <div className="w-full h-[50em] relative">
      <AIModuleSessionHistory {...args} title="Idag" sessions={sessions}></AIModuleSessionHistory>
    </div>
  );
};
