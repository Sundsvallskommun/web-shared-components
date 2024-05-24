import { Meta } from '@storybook/react';
import { SessionHistory } from '../src';
import { AIModuleSessionHistory } from '../src/components';

export default {
  title: 'AI/Komponenter/AIModuleSessionHistory',
  component: AIModuleSessionHistory,
  tags: ['autodocs'],
} as Meta<typeof AIModuleSessionHistory>;

const sessions: SessionHistory = [
  { id: '1', title: 'Vem är min chef?', updatedAt: new Date() },
  { id: '2', title: 'Varför kan jag inte argumentera?', updatedAt: new Date() },
  { id: '3', title: 'Vem är min chef?', updatedAt: new Date() },
];
export const Template = (args: typeof AIModuleSessionHistory) => {
  return (
    <div className="w-full h-[50em] relative">
      <AIModuleSessionHistory {...args} title="Idag" sessions={sessions}></AIModuleSessionHistory>
    </div>
  );
};
