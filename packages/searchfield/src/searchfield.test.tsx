import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchFieldBase } from './searchfield';

describe('SearchFieldBase', () => {
  // Helper to create default props
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
  };

  describe('Rendering', () => {
    it('renders with placeholder', () => {
      render(<SearchFieldBase {...defaultProps} placeholder="Sök här..." />);
      expect(screen.getByPlaceholderText('Sök här...')).toBeInTheDocument();
    });

    it('renders with value', () => {
      render(<SearchFieldBase {...defaultProps} value="test query" />);
      expect(screen.getByDisplayValue('test query')).toBeInTheDocument();
    });

    it('renders search icon', () => {
      render(<SearchFieldBase {...defaultProps} />);
      expect(document.querySelector('.sk-search-field-base-icon')).toBeInTheDocument();
    });
  });

  describe('onChange', () => {
    it('calls onChange on text input', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<SearchFieldBase {...defaultProps} onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      await user.type(input, 'a');

      expect(handleChange).toHaveBeenCalled();
    });

    it('updates internal query state', async () => {
      const user = userEvent.setup();

      render(<SearchFieldBase {...defaultProps} />);
      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(input).toHaveValue('test');
    });
  });

  describe('Search button (showSearchButton)', () => {
    it('shows when there is a value (default: onValue)', async () => {
      const user = userEvent.setup();

      render(<SearchFieldBase {...defaultProps} />);
      expect(screen.queryByRole('button', { name: 'Sök' })).not.toBeInTheDocument();

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(screen.getByRole('button', { name: 'Sök' })).toBeInTheDocument();
    });

    it('hides when input is empty', () => {
      render(<SearchFieldBase {...defaultProps} value="" />);
      expect(screen.queryByRole('button', { name: 'Sök' })).not.toBeInTheDocument();
    });

    it('always shows when showSearchButton={true}', () => {
      render(<SearchFieldBase {...defaultProps} showSearchButton={true} />);
      expect(screen.getByRole('button', { name: 'Sök' })).toBeInTheDocument();
    });

    it('never shows when showSearchButton={false}', async () => {
      const user = userEvent.setup();

      render(<SearchFieldBase {...defaultProps} showSearchButton={false} />);
      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(screen.queryByRole('button', { name: 'Sök' })).not.toBeInTheDocument();
    });

    it('calls onSearch on click', async () => {
      const handleSearch = vi.fn();
      const user = userEvent.setup();

      render(<SearchFieldBase {...defaultProps} value="test" onSearch={handleSearch} />);
      await user.click(screen.getByRole('button', { name: 'Sök' }));

      expect(handleSearch).toHaveBeenCalledWith('test');
    });
  });

  describe('Reset button (showResetButton)', () => {
    it('shows when there is a value', async () => {
      const user = userEvent.setup();

      render(<SearchFieldBase {...defaultProps} />);
      expect(screen.queryByRole('button', { name: 'Rensa' })).not.toBeInTheDocument();

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(screen.getByRole('button', { name: 'Rensa' })).toBeInTheDocument();
    });

    it('calls onReset on click', async () => {
      const handleReset = vi.fn();
      const user = userEvent.setup();

      render(<SearchFieldBase {...defaultProps} value="test" onReset={handleReset} />);
      await user.click(screen.getByRole('button', { name: 'Rensa' }));

      expect(handleReset).toHaveBeenCalled();
    });

    it('clears the input field', async () => {
      const user = userEvent.setup();

      render(<SearchFieldBase {...defaultProps} value="test" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('test');

      await user.click(screen.getByRole('button', { name: 'Rensa' }));

      expect(input).toHaveValue('');
    });

    it('focuses input after reset', async () => {
      const user = userEvent.setup();
      vi.useFakeTimers({ shouldAdvanceTime: true });

      render(<SearchFieldBase {...defaultProps} value="test" />);
      await user.click(screen.getByRole('button', { name: 'Rensa' }));

      await vi.runAllTimersAsync();

      expect(screen.getByRole('textbox')).toHaveFocus();

      vi.useRealTimers();
    });
  });

  describe('Enter key', () => {
    it('triggers onSearch with current query', async () => {
      const handleSearch = vi.fn();
      const user = userEvent.setup();

      render(<SearchFieldBase {...defaultProps} value="search term" onSearch={handleSearch} />);
      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('{Enter}');

      expect(handleSearch).toHaveBeenCalledWith('search term');
    });
  });

  describe('Sizes', () => {
    it('applies md size class', () => {
      render(<SearchFieldBase {...defaultProps} size="md" />);
      expect(document.querySelector('.sk-searchfield-base-md')).toBeInTheDocument();
    });

    it('applies lg size class (default)', () => {
      render(<SearchFieldBase {...defaultProps} />);
      expect(document.querySelector('.sk-searchfield-base-lg')).toBeInTheDocument();
    });
  });

  describe('Ref forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = vi.fn();
      render(<SearchFieldBase {...defaultProps} ref={ref} />);
      expect(ref).toHaveBeenCalled();
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLInputElement);
    });
  });
});
