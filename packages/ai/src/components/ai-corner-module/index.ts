import { AICornerModuleHeader, AICornerModuleHeaderProps } from './ai-corner-module-header';
import {
  AICornerModuleHeaderMenu as InternalAICornerModuleHeaderMenu,
  AICornerModuleHeaderMenuProps as InternalAICornerModuleHeaderMenuProps,
} from './ai-corner-module-header-menu';
import { AICornerModuleHeaderMenuItem } from './ai-corner-module-header-menu-item';
import { AICornerModule, AICornerModuleProps } from './ai-corner-module';
import { AICornerModuleSessionHistory } from './ai-corner-module-session-history';
import { AICornerModuleSessions } from './ai-corner-module-sessions';
import { AICornerModuleWrapper } from './ai-corner-module-wrapper';
import { AICornerModuleMobileMenu } from './ai-corner-module-mobile-menu';

interface AICornerModuleHeaderMenuProps extends React.ForwardRefExoticComponent<InternalAICornerModuleHeaderMenuProps> {
  Component: typeof InternalAICornerModuleHeaderMenu;
  Item: typeof AICornerModuleHeaderMenuItem;
}

const AICornerModuleHeaderMenu = {
  ...InternalAICornerModuleHeaderMenu,
  Component: InternalAICornerModuleHeaderMenu,
  Item: AICornerModuleHeaderMenuItem,
} as AICornerModuleHeaderMenuProps;

export {
  AICornerModuleHeader,
  AICornerModuleSessionHistory,
  AICornerModule,
  AICornerModuleSessions,
  AICornerModuleHeaderMenu,
  AICornerModuleWrapper,
  AICornerModuleMobileMenu,
};
export type {
  AICornerModuleHeaderProps,
  AICornerModuleProps,
  AICornerModuleHeaderMenuProps,
  InternalAICornerModuleHeaderMenuProps,
};
