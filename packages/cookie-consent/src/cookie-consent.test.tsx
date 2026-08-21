import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CookieConsent } from './index';

describe('CookieConsent', () => {
  const defaultProps = {
    title: 'Cookie Settings',
    body: 'We use cookies.',
    onConsent: vi.fn(),
    cookies: [
      { displayName: 'Necessary', description: 'Required', cookieName: 'necessary', optional: false },
      { displayName: 'Analytics', description: 'Usage statistics', cookieName: 'analytics', optional: true },
      { displayName: 'Marketing', description: 'Personalisation', cookieName: 'marketing', optional: true },
    ],
    resetConsentOnInit: true,
  };

  it('renders the dialog when controlled open', () => {
    render(<CookieConsent {...defaultProps} isOpen />);
    expect(screen.getByRole('dialog', { name: 'Cookie Settings' })).toBeInTheDocument();
  });

  it('does not render the dialog when controlled closed', () => {
    render(<CookieConsent {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
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

    expect(handleConsent).toHaveBeenCalledTimes(1);
    expect(handleConsent).toHaveBeenCalledWith([
      expect.objectContaining({ cookieName: 'necessary', isChecked: true }),
      expect.objectContaining({ cookieName: 'analytics', isChecked: false }),
      expect.objectContaining({ cookieName: 'marketing', isChecked: false }),
    ]);
  });

  it('returns only required cookies when accepting necessary cookies', async () => {
    const handleConsent = vi.fn();
    const user = userEvent.setup();

    render(<CookieConsent {...defaultProps} onConsent={handleConsent} isOpen />);
    await user.click(screen.getByRole('button', { name: 'Godkänn endast nödvändiga' }));

    expect(handleConsent).toHaveBeenCalledWith([expect.objectContaining({ cookieName: 'necessary', isChecked: true })]);
  });

  it('shows cookie options when manage is clicked', async () => {
    const user = userEvent.setup();

    render(<CookieConsent {...defaultProps} isOpen />);
    await user.click(screen.getByText('Hantera kakor'));

    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Marketing')).toBeInTheDocument();
  });

  it('returns the selected optional cookies when saving custom choices', async () => {
    const handleConsent = vi.fn();
    const user = userEvent.setup();

    render(<CookieConsent {...defaultProps} onConsent={handleConsent} isOpen />);
    await user.click(screen.getByRole('button', { name: 'Hantera kakor' }));
    await user.click(screen.getByRole('checkbox', { name: /Analytics/ }));
    await user.click(screen.getByRole('button', { name: 'Spara mina val' }));

    expect(handleConsent).toHaveBeenCalledWith([
      expect.objectContaining({ cookieName: 'necessary', isChecked: true }),
      expect.objectContaining({ cookieName: 'analytics', isChecked: true }),
    ]);
  });

  it('applies sk-cookie-consent class', () => {
    render(<CookieConsent {...defaultProps} isOpen />);
    expect(document.querySelector('.sk-cookie-consent')).toBeInTheDocument();
  });
});
