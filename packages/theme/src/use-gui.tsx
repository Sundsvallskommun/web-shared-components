import { Dict, WithCSSVar } from '@sk-web-gui/utils';
import React from 'react';
import { GuiContext } from './utils';

export function useGui<T extends object = Dict>() {
  const theme = React.useContext(GuiContext as unknown as React.Context<T | undefined>);
  if (!theme) {
    throw Error('useGui: `theme` is undefined. Seems you forgot to wrap your app in `<GuiProvider />`');
  }

  return theme as WithCSSVar<T>;
}
