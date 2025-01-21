import { defaultTheme } from '@sk-web-gui/theme';
import type { Preview } from '@storybook/react';
import { useContext } from 'react';
import { ThemeContext } from './components/theme-context';
import { WithGuiDecorator } from './components/theme-decorators';
import { MemoizedDocsContainer, MemoizedGuiProvider } from './components/theme-helpers';
import './styles.scss';
import { ParametersContainer } from './components/theme-parameters';

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
      transform: (code: any, storyContext: { name: any }) => {
        return `
        import { ${storyContext.name} } from '@sk-web-gui/react';

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
};

export default preview;
