import {
  AIServiceModule as AIServiceModuleComponent,
  type AIServiceModuleProps as AIServiceModuleComponentProps,
} from './ai-service-module';
import { AIServiceModuleAssistant } from './ai-service-module-assistant';
import { AIServiceModuleContent } from './ai-service-module-content';
import { AIServiceModuleHeader } from './ai-service-module-header';
import { AIServiceModuleQuestions } from './ai-service-module-questions';
import { AIServiceModuleRow } from './ai-service-module-row';
import { AIServiceModuleWrapper } from './ai-service-module-wrapper';

interface AIServiceModuleProps extends React.ForwardRefExoticComponent<AIServiceModuleComponentProps> {
  Wrapper: typeof AIServiceModuleWrapper;
  Row: typeof AIServiceModuleRow;
  Header: typeof AIServiceModuleHeader;
  Content: typeof AIServiceModuleContent;
  Questions: typeof AIServiceModuleQuestions;
  Assistant: typeof AIServiceModuleAssistant;
  Component: typeof AIServiceModuleComponent;
}

export const AIServiceModule = {
  ...AIServiceModuleComponent,
  Wrapper: AIServiceModuleWrapper,
  Row: AIServiceModuleRow,
  Header: AIServiceModuleHeader,
  Content: AIServiceModuleContent,
  Questions: AIServiceModuleQuestions,
  Assistant: AIServiceModuleAssistant,
} as AIServiceModuleProps;

export type { AIServiceModuleComponentProps, AIServiceModuleProps };
