import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from './index';

describe('NextCard public contract', () => {
  it('renders a link when href is provided', () => {
    render(
      <Card.Component href="/news">
        <Card.Body>
          <Card.Header>News</Card.Header>
        </Card.Body>
      </Card.Component>
    );

    expect(screen.getByRole('link', { name: 'News' })).toHaveAttribute('href', '/news');
  });
});
