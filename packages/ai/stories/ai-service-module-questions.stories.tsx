import { Meta } from '@storybook/react';
import { AIServiceModule } from '../src/components';
import { type AIServiceModuleQuestionsEssentialProps } from '../src/components/ai-service-module/ai-service-module-questions';

export default {
  title: 'AI/Komponenter/AIServiceModule/Questions',
  component: AIServiceModule.Questions,
  tags: ['autodocs'],
  args: {
    questions: [
      { question: 'Can I ask in my native language?', lang: 'en' },
      'Vad är vuxenutbildning?',
      'Hur ansöker jag till en kurs?',
      'Kan jag få studievägledning?',
    ],
  },
} as Meta<AIServiceModuleQuestionsEssentialProps>;

export const Template = (args: AIServiceModuleQuestionsEssentialProps) => (
  <AIServiceModule.Questions {...args}></AIServiceModule.Questions>
);
