import { GuiProvider } from '@sk-web-gui/theme';
import { DocsContainer } from '@storybook/addon-docs';
import React from 'react';

export const MemoizedDocsContainer = React.memo(DocsContainer);

export const MemoizedGuiProvider = React.memo((props: React.ComponentPropsWithoutRef<typeof GuiProvider>) => (
  <GuiProvider {...props} />
));
