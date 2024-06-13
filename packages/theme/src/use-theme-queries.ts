import { useMediaQuery } from 'usehooks-ts';
import { defaultTheme } from './default-theme';
import { useGui } from './gui-provider';
import { GuiTheme } from './types';

interface ThemeQueries {
  /**
   * Screen is equal to, or wider than, phone min width
   * and equal to, or smaller than, phone max width
   */
  isPhone: boolean;
  /**
   * Screen is equal to, or wider than, phone min width
   */
  isMinPhone: boolean;
  /**
   * Screen is equal to, or smaller than, phone max width
   */
  isMaxPhone: boolean;

  /**
   * Screen is equal to, or wider than, small device min width
   * and equal to, or smaller than, large device max width
   */
  isDevice: boolean;

  /**
   * Screen is equal to, or wider than, small device min width
   * and equal to, or smaller than, small device max width
   */
  isSmallDevice: boolean;
  /**
   * Screen is equal to, or wider than, small device min width
   */
  isMinSmallDevice: boolean;
  /**
   * Screen is equal to, or smaller than, small device max width
   */
  isMaxSmallDevice: boolean;

  /**
   * Screen is equal to, or wider than, medium device min width
   * and equal to, or smaller than, medium device max width
   */
  isMediumDevice: boolean;
  /**
   * Screen is equal to, or wider than, medium device min width
   */
  isMinMediumDevice: boolean;
  /**
   * Screen is equal to, or smaller than, medium device max width
   */
  isMaxMediumDevice: boolean;

  /**
   * Screen is equal to, or wider than, large device min width
   * and equal to, or smaller than, large device max width
   */
  isLargeDevice: boolean;
  /**
   * Screen is equal to, or wider than, large device min width
   */
  isMinLargeDevice: boolean;
  /**
   * Screen is equal to, or smaller than, large device max width
   */
  isMaxLargeDevice: boolean;

  /**
   * Screen is equal to, or wider than, desktop device min width
   * and equal to, or smaller than, desktop device max width
   */
  isDesktop: boolean;
  /**
   * Screen is equal to, or wider than, desktop device min width
   */
  isMinDesktop: boolean;
  /**
   * Screen is equal to, or smaller than, desktop device max width
   */
  isMaxDesktop: boolean;

  /**
   * @returns isMinPhone
   */
  isMinXs: boolean;
  /**
   * @returns isMaxPhone
   */
  isMaxXs: boolean;
  /**
   * @returns isPhone
   */
  isXs: boolean;

  /**
   * @returns isMinSmallDevice
   */
  isMinSm: boolean;
  /**
   * @returns isMaxSmallDevice
   */
  isMaxSm: boolean;
  /**
   * @returns isSmallDevice
   */
  isSm: boolean;

  /**
   * @returns isMinMediumDevice
   */
  isMinMd: boolean;
  /**
   * @returns isMaxMediumDevice
   */
  isMaxMd: boolean;
  /**
   * @returns isMediumDevice
   */
  isMd: boolean;

  /**
   * @returns isMinLargeDevice
   */
  isMinLg: boolean;
  /**
   * @returns isMaxLargeDevice
   */
  isMaxLg: boolean;
  /**
   * @returns isLargeDevice
   */
  isLg: boolean;

  /**
   * @returns isMinDesktop
   */
  isMinXl: boolean;
  /**
   * @returns isMaxDesktop
   */
  isMaxXl: boolean;
  /**
   * @returns isDesktop
   */
  isXl: boolean;
}

/**
 * Returns predefined media queries from theme.
 *
 * Will use theme from GuiProvider if none is provided as param.
 * If no theme can be found in GuiProvider, defaultTheme will be used.
 *
 * @param {object} [theme] - GuiTheme.
 * @returns ThemeQueries
 */
export const useThemeQueries: (theme?: GuiTheme) => ThemeQueries = (theme) => {
  const { theme: _guiTheme } = useGui();
  const myTheme = theme || _guiTheme || defaultTheme;

  const isMinXs = useMediaQuery(`screen and (min-width: ${myTheme?.screens['phone-min']})`);
  const isMaxXs = useMediaQuery(`screen and (max-width: ${myTheme?.screens['phone-max']})`);
  const isXs = isMinXs && isMaxXs;
  const isPhone = isXs;
  const isMinPhone = isMinXs;
  const isMaxPhone = isMaxXs;

  const isMinSm = useMediaQuery(`screen and (min-width: ${myTheme?.screens['small-device-min']})`);
  const isMaxSm = useMediaQuery(`screen and (max-width: ${myTheme?.screens['small-device-max']})`);
  const isSm = isMinSm && isMaxSm;
  const isSmallDevice = isSm;
  const isMinSmallDevice = isMinSm;
  const isMaxSmallDevice = isMaxSm;

  const isMinMd = useMediaQuery(`screen and (min-width: ${myTheme?.screens['medium-device-min']})`);
  const isMaxMd = useMediaQuery(`screen and (max-width: ${myTheme?.screens['medium-device-max']})`);
  const isMd = isMinMd && isMaxMd;
  const isMediumDevice = isMd;
  const isMinMediumDevice = isMinMd;
  const isMaxMediumDevice = isMaxMd;

  const isMinLg = useMediaQuery(`screen and (min-width: ${myTheme?.screens['large-device-min']})`);
  const isMaxLg = useMediaQuery(`screen and (max-width: ${myTheme?.screens['large-device-max']})`);
  const isLg = isMinLg && isMaxLg;
  const isLargeDevice = isLg;
  const isMinLargeDevice = isMinLg;
  const isMaxLargeDevice = isMaxLg;
  const isDevice = isSmallDevice || isMediumDevice || isLargeDevice;

  const isMinXl = useMediaQuery(`screen and (min-width: ${myTheme?.screens['desktop-min']})`);
  const isMaxXl = useMediaQuery(`screen and (max-width: ${myTheme?.screens['desktop-max']})`);
  const isXl = isMinXl && isMaxXl;
  const isDesktop = isXl;
  const isMinDesktop = isMinXl;
  const isMaxDesktop = isMaxXl;

  return {
    isMinXs,
    isMaxXs,
    isXs,
    isMinPhone,
    isMaxPhone,
    isPhone,
    isMinSm,
    isMaxSm,
    isSm,
    isMinSmallDevice,
    isMaxSmallDevice,
    isSmallDevice,
    isMinMd,
    isMaxMd,
    isMd,
    isMinMediumDevice,
    isMaxMediumDevice,
    isMediumDevice,
    isMinLg,
    isMaxLg,
    isLg,
    isMinLargeDevice,
    isMaxLargeDevice,
    isLargeDevice,
    isDevice,
    isMinXl,
    isMaxXl,
    isXl,
    isMinDesktop,
    isMaxDesktop,
    isDesktop,
  };
};
