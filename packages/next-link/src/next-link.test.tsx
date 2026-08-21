import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NextLink } from './index';

describe('NextLink public contract', () => {
  it('renders an accessible Next.js link', () => {
    render(<NextLink href="/services">Services</NextLink>);

    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services');
  });
});
