import { Combobox } from '@sk-web-gui/forms';
import { CustomOnChangeEvent, cx } from '@sk-web-gui/utils';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import React from 'react';
import { countryCodes } from './countrycodes';

export interface CountryCodeComboboxProps extends Omit<React.ComponentProps<typeof Combobox.Component>, 'onChange'> {
  /**
   * Returns the country code as a number (e.g 46).
   * onChange will hold the selected country's 2 digit ISO code (e.g SE).
   * This is important to differentiate between countries with the same country code (e.g 1 for US and CA).
   *
   * @param value Country code select value mapped to actual country code (e.g 46);
   */
  onChangeCountryCode: (value: number | undefined) => void;
  /**
   * The event value holds the selected country's 2 digit ISO code (e.g SE) followed by a + and the country code
   * Resulting in a string like "SE+46"
   */
  onChange: (event: CustomOnChangeEvent<string, HTMLInputElement>) => void;
  /**
   * The selected country's 2 digit ISO code (e.g SE)
   */
  value?: string;
  /**
   * Countries to be displayed in the select dropdown as an
   * array of 2 digit ISO codes, e.g [SE, NO, FI]
   * @default all countries
   */
  countries?: string[];
}

export const CountryCodeCombobox = React.forwardRef<HTMLInputElement, CountryCodeComboboxProps>((props, ref) => {
  const {
    onChangeCountryCode,
    countries,
    onChange,
    className,
    searchValue: _searchValue,
    onChangeSearch,
    ...rest
  } = props;
  polyfillCountryFlagEmojis();
  const [searchTerm, setSearchTerm] = React.useState<string>(_searchValue ?? '');
  const searchValue = _searchValue ?? searchTerm;
  const searchFilter = searchValue.trim().toLowerCase();

  const handleOnChange = (event: CustomOnChangeEvent<string | string[], HTMLInputElement>) => {
    if (typeof event.target.value === 'string') {
      onChangeCountryCode?.(
        countryCodes.find((country) => country.isoCode === (event.target.value as string).split('-')[1])?.countryCode
      );
      onChange?.(event as CustomOnChangeEvent<string, HTMLInputElement>);
    }
  };

  const handleChangeSearch = (event: CustomOnChangeEvent<string>) => {
    onChangeSearch?.(event);
    setSearchTerm(event.target.value);
  };

  const countryOptions =
    typeof countries !== 'undefined'
      ? countries.map((country) => countryCodes.find((c) => c.isoCode === country))
      : countryCodes?.sort((a, b) => (a.countryCode.toString() < b.countryCode.toString() ? -1 : 1));

  return (
    <Combobox
      ref={ref}
      onChange={handleOnChange}
      className={cx('sk-country-code sk-country-code-combobox', className)}
      autofilter={false}
      {...rest}
    >
      <Combobox.Input onChangeSearch={handleChangeSearch} searchValue={searchValue} />
      <Combobox.List>
        {countryOptions
          ?.filter(
            (country) =>
              !!country &&
              (country.name.toLowerCase().includes(searchFilter) ||
                country.isoCode.toLowerCase().includes(searchFilter) ||
                `+${country.countryCode}`.includes(searchFilter))
          )

          .map(
            (country) =>
              country && (
                <Combobox.Option
                  key={country.countryCode + country.isoCode}
                  value={country.countryCode + '-' + country.isoCode}
                  aria-label={`+${country.countryCode}, ${country.name}`}
                >
                  {`${country.flag} +${country.countryCode}`}
                </Combobox.Option>
              )
          )}
      </Combobox.List>
    </Combobox>
  );
});
