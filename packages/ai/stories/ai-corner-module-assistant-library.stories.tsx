import { Meta } from '@storybook/react';
import { Assistant } from '../src';
import { AICornerModuleAssistantLibrary, AICornerModuleAssistantLibraryProps } from '../src/components';
import paragrafSrc from './images/paragrafryttaren.png';
import qwertySrc from './images/qwerty-avatar.png';

export default {
  title: 'AI/Komponenter/AICornerModule/AssistantLibrary',
  component: AICornerModuleAssistantLibrary,
  tags: ['autodocs'],
} as Meta<AICornerModuleAssistantLibraryProps>;

const qwerty: Assistant = {
  settings: { assistantId: '12345' },
  info: { name: 'Qwerty', title: 'Din AI-guide på intranätet', avatar: qwertySrc },
};
const paragrafryttaren: Assistant = {
  settings: { assistantId: '2345' },
  info: {
    name: 'Paragrafryttaren',
    title: 'Din AI-guide på intranätet',
    avatar: paragrafSrc,
  },
};

export const Template = (args: AICornerModuleAssistantLibraryProps) => {
  return (
    <div className="w-full h-[50rem] p-80 flex justify-center items-center bg-gray-300">
      <AICornerModuleAssistantLibrary
        {...args}
        className="w-[30rem]"
        current="12345"
        assistants={[qwerty, paragrafryttaren]}
      />
    </div>
  );
};
