import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

vi.mock('country-flag-emoji-polyfill', () => ({ polyfillCountryFlagEmojis: vi.fn() }));

import { CountryCodeSelect } from './index';

describe('CountryCodeSelect public contract', () => {
  it('limits countries and reports both ISO and numeric country code', async () => {
    const onChange = vi.fn();
    const onChangeCountryCode = vi.fn();
    const user = userEvent.setup();
    render(
      <CountryCodeSelect
        aria-label="Country code"
        countries={['SE', 'NO']}
        onChange={onChange}
        onChangeCountryCode={onChangeCountryCode}
      />
    );

    const select = screen.getByRole('combobox', { name: 'Country code' });
    expect(screen.getAllByRole('option')).toHaveLength(2);

    await user.selectOptions(select, 'SE+46');

    expect(onChangeCountryCode).toHaveBeenCalledWith(46);
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: select }));
  });
});
