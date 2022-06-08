import { create } from '@storybook/theming';
import logo from './public/logo.svg';

export default create({
  base: 'light',
  brandTitle: 'Sundsvalls Kommun',
  // brandUrl: 'https://sundsvall.se',
  brandImage: logo,

  // Custom theme
  colorPrimary: '#005595',
  colorSecondary: '#2B76B0',

  // UI
  appBg: '#f9f9f9',
  appContentBg: '#fff',
  appBorderColor: '#939393',
  appBorderRadius: 4,

  // Typography
  //fontBase: '"Open Sans", sans-serif',
  //fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: 'black',
  barSelectedColor: '#005595',
  barBg: 'white',

  // Form colors
  inputBg: 'white',
  inputBorder: '#939393',
  inputTextColor: 'black',
  inputBorderRadius: 4,
});