import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Image, NativeImage } from './index';

describe('Image public contract', () => {
  it('renders the source directly when native lazy loading is requested', () => {
    render(<Image src="photo.jpg" alt="A landscape" loading="lazy" />);

    expect(screen.getByRole('img', { name: 'A landscape' })).toHaveAttribute('src', 'photo.jpg');
    expect(screen.getByRole('img', { name: 'A landscape' })).toHaveAttribute('loading', 'lazy');
  });

  it('renders a fallback while the source is pending', () => {
    render(<Image src="photo.jpg" fallback={<span role="status">Loading image</span>} />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading image');
  });

  it('maps native dimensions to image attributes', () => {
    render(<NativeImage src="photo.jpg" alt="Sized image" htmlWidth={320} htmlHeight={180} />);

    expect(screen.getByRole('img', { name: 'Sized image' })).toHaveAttribute('width', '320');
    expect(screen.getByRole('img', { name: 'Sized image' })).toHaveAttribute('height', '180');
  });
});
