import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CookieConsent } from './cookie-consent';

describe('CookieConsent', () => {
  const defaultProps = {
    title: 'Cookie Settings',
    body: 'We use cookies.',
    onConsent: vi.fn(),
    cookies: [
      { displayName: 'Analytics', optional: true, isChecked: false },
      { displayName: 'Marketing', optional: true, isChecked: false },
    ],
    resetConsentOnInit: true,
  };

  it('renders the dialog when open', () => {
    render(<CookieConsent {...defaultProps} isOpen />);
    expect(screen.getByText('Cookie Settings')).toBeInTheDocument();
  });

  it('renders the body text', () => {
    render(<CookieConsent {...defaultProps} isOpen />);
    expect(screen.getByText('We use cookies.')).toBeInTheDocument();
  });

  it('renders accept all button', () => {
    render(<CookieConsent {...defaultProps} isOpen />);
    expect(screen.getByText('Godkänn alla')).toBeInTheDocument();
  });

  it('renders accept necessary button', () => {
    render(<CookieConsent {...defaultProps} isOpen />);
    expect(screen.getByText('Godkänn endast nödvändiga')).toBeInTheDocument();
  });

  it('renders manage cookies button', () => {
    render(<CookieConsent {...defaultProps} isOpen />);
    expect(screen.getByText('Hantera kakor')).toBeInTheDocument();
  });

  it('calls onConsent when accepting all', async () => {
    const handleConsent = vi.fn();
    const user = userEvent.setup();

    render(<CookieConsent {...defaultProps} onConsent={handleConsent} isOpen />);
    await user.click(screen.getByText('Godkänn alla'));

    expect(handleConsent).toHaveBeenCalled();
  });

  it('shows cookie options when manage is clicked', async () => {
    const user = userEvent.setup();

    render(<CookieConsent {...defaultProps} isOpen />);
    await user.click(screen.getByText('Hantera kakor'));

    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
  });

  it('applies sk-cookie-consent class', () => {
    render(<CookieConsent {...defaultProps} isOpen />);
    expect(document.querySelector('.sk-cookie-consent')).toBeInTheDocument();
  });
});
