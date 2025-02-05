import type { Preview } from '@storybook/react';
import { WithGuiDecorator } from './components/theme-decorators';
import { ParametersContainer } from './components/theme-parameters';
import './styles.scss';

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
};

export default preview;
