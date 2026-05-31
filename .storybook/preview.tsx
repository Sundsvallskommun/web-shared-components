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
        // Stories that don't live under packages/* (e.g. .storybook/stories/**) have no
        // package name to import from — just show the snippet as-is.
        const packageName = storyContext?.parameters?.fileName?.match(/\.\/packages\/([^/]+)\//)?.[1];
        if (!packageName) {
          return code;
        }
        return `
        import { ${storyContext.name} } from '@sk-web-gui/${packageName}';

${code}`;
      },
    },
    container: ({ children, context }) => <ParametersContainer context={context}>{children}</ParametersContainer>,
  },
};

export const globalTypes: Preview['globalTypes'] = {
  brandTheme: {
    name: 'Org-tema',
    description: 'Organisationens färgtema (neutraler + brand-roller). Feedback-färger står still.',
    defaultValue: 'sundsvall',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'sundsvall', title: 'Sundsvall (standard)' },
        { value: 'aldeeran', title: 'Aldeeran (exempel-org)' },
      ],
      dynamicTitle: true,
    },
  },
};

export const decorators: Preview['decorators'] = [WithGuiDecorator];

const preview: Preview = {
  parameters,
  decorators,
  tags: ['autodocs'],
};

export default preview;
