import { AIModuleHeader, AIModuleHeaderProps } from './ai-module-header';
import {
  AIModuleHeaderMenu as InternalAIModuleHeaderMenu,
  AIModuleHeaderMenuProps as InternalAIModuleHeaderMenuProps,
} from './ai-module-header-menu';
import { AIModuleHeaderMenuItem } from './ai-module-header-menu-item';
import { AIModule, AIModuleProps } from './ai-module';
import { AIModuleSessionHistory } from './ai-module-session-history';
import { AIModuleSessions } from './ai-module-sessions';

interface AIModuleHeaderMenuProps extends React.ForwardRefExoticComponent<InternalAIModuleHeaderMenuProps> {
  Component: typeof InternalAIModuleHeaderMenu;
  Item: typeof AIModuleHeaderMenuItem;
}

const AIModuleHeaderMenu = {
  ...InternalAIModuleHeaderMenu,
  Component: InternalAIModuleHeaderMenu,
  Item: AIModuleHeaderMenuItem,
} as AIModuleHeaderMenuProps;

export { AIModuleHeader, AIModuleSessionHistory, AIModule, AIModuleSessions, AIModuleHeaderMenu };
export type { AIModuleHeaderProps, AIModuleProps, AIModuleHeaderMenuProps, InternalAIModuleHeaderMenuProps };
