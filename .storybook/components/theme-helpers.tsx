import { GuiProvider } from '@sk-web-gui/theme';
import { DocsContainer } from '@storybook/addon-docs';
import React from 'react';

export const MemoizedDocsContainer = React.memo(DocsContainer);

export const MemoizedGuiProvider = React.memo(
  ({ children, theme, colorScheme }: React.ComponentPropsWithoutRef<typeof GuiProvider>) => (
    <GuiProvider theme={theme} colorScheme={colorScheme}>
      {children}
    </GuiProvider>
  )
);
