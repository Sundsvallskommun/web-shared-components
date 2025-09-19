import { Select } from '@sk-web-gui/forms';
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
import React from 'react';
import { countryCodes } from './countrycodes';
import { cx } from '@sk-web-gui/utils';

export interface CountryCodeSelectProps extends React.ComponentProps<typeof Select> {
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
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  /**
   * The selected country's 2 digit ISO code (e.g SE)
   */
  value?: string;
  /**
   * Text displayed when no country is selected
   */
  placeholder?: string;
  /**
   * Countries to be displayed in the select dropdown as an
   * array of 2 digit ISO codes, e.g [SE, NO, FI]
   * @default all countries
   */
  countries?: string[];
}

export const CountryCodeSelect = React.forwardRef<HTMLSelectElement, CountryCodeSelectProps>((props, ref) => {
  const { placeholder, onChangeCountryCode, countries, onChange, className, ...rest } = props;
  polyfillCountryFlagEmojis();

  const handleOngChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeCountryCode?.(
      countryCodes.find((country) => country.isoCode === event.target.value.split('+')[0])?.countryCode
    );
    onChange?.(event);
  };

  const countryOptions =
    typeof countries !== 'undefined'
      ? countries.map((country) => countryCodes.find((c) => c.isoCode === country))
      : countryCodes?.sort((a, b) => (a.countryCode.toString() < b.countryCode.toString() ? -1 : 1));

  return (
    <Select
      ref={ref}
      onChange={handleOngChange}
      className={cx('sk-country-code sk-country-code-select', className)}
      {...rest}
    >
      {placeholder && (
        <Select.Option value="" disabled>
          {placeholder}
        </Select.Option>
      )}
      {countryOptions.map(
        (country) =>
          country && (
            <Select.Option
              key={country.countryCode + country.isoCode}
              value={country.isoCode + '+' + country.countryCode}
              aria-label={`+${country.countryCode}, ${country.name}`}
            >
              {country.flag} +{country.countryCode}
            </Select.Option>
          )
      )}
    </Select>
  );
});
