import React from 'react';
import { ColorSchemeMode } from '@sk-web-gui/theme';

export const ThemeContext = React.createContext<ColorSchemeMode>(ColorSchemeMode.Light);
