import type { Preview } from '@storybook/react-vite';
import { WithGuiDecorator } from './components/theme-decorators';
import { ParametersContainer } from './components/theme-parameters';
import './styles.scss';

const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
let unexpectedConsoleMessages: string[] = [];

const captureConsoleMessage = (level: 'error' | 'warn', args: unknown[]) => {
  unexpectedConsoleMessages.push(`[${level}] ${args.map(String).join(' ')}`);
};

const parameters: Preview['parameters'] = {
  viewMode: 'docs',
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Intro', 'Identitet', 'Sidor', 'Komponenter', 'Design System'],
    },
  },
  controls: { hideNoControlsWarning: true },
  docs: {
    source: {
      type: 'code',
      transform: (code: any, storyContext) => {
        const packageName = storyContext?.parameters?.fileName?.match(/\.\/packages\/([^/]+)\//)[1];
        return `
        import { ${storyContext.name} } from '@sk-web-gui/${packageName}';

${code}`;
      },
    },
    container: ({ children, context }) => <ParametersContainer context={context}>{children}</ParametersContainer>,
  },
};

export const decorators: Preview['decorators'] = [WithGuiDecorator];

const preview: Preview = {
  parameters,
  decorators,
  tags: ['autodocs'],
  beforeEach: () => {
    unexpectedConsoleMessages = [];
    console.error = (...args: unknown[]) => {
      captureConsoleMessage('error', args);
      originalConsoleError(...args);
    };
    console.warn = (...args: unknown[]) => {
      captureConsoleMessage('warn', args);
      originalConsoleWarn(...args);
    };

    return () => {
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
    };
  },
  afterEach: () => {
    if (unexpectedConsoleMessages.length > 0) {
      throw new Error(`Unexpected browser console output:\n${unexpectedConsoleMessages.join('\n')}`);
    }
  },
};

export default preview;
