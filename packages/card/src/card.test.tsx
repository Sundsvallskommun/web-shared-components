import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card as InternalCard, CardBody, CardHeader, CardText } from './card';

describe('Card', () => {
  it('renders a div element', () => {
    const { container } = render(
      <InternalCard>
        <CardBody><CardText>Content</CardText></CardBody>
      </InternalCard>
    );
    expect(container.querySelector('.sk-card')).toBeInTheDocument();
  });

  it('applies color data attribute', () => {
    const { container } = render(
      <InternalCard color="tertiary">
        <CardBody><CardText>Content</CardText></CardBody>
      </InternalCard>
    );
    expect(container.querySelector('.sk-card')).toHaveAttribute('data-color', 'tertiary');
  });

  it('applies vertical layout by default', () => {
    const { container } = render(
      <InternalCard>
        <CardBody><CardText>Content</CardText></CardBody>
      </InternalCard>
    );
    expect(container.querySelector('.sk-card')).toHaveAttribute('data-layout', 'vertical');
  });

  it('applies horizontal layout', () => {
    const { container } = render(
      <InternalCard layout="horizontal">
        <CardBody><CardText>Content</CardText></CardBody>
      </InternalCard>
    );
    expect(container.querySelector('.sk-card')).toHaveAttribute('data-layout', 'horizontal');
  });

  it('applies hover effect class', () => {
    const { container } = render(
      <InternalCard useHoverEffect>
        <CardBody><CardText>Content</CardText></CardBody>
      </InternalCard>
    );
    expect(container.querySelector('.sk-card-use-hover-effect')).toBeInTheDocument();
  });

  it('applies inverted data attribute', () => {
    const { container } = render(
      <InternalCard invert>
        <CardBody><CardText>Content</CardText></CardBody>
      </InternalCard>
    );
    expect(container.querySelector('.sk-card')).toHaveAttribute('data-inverted', 'true');
  });

  it('renders CardBody', () => {
    const { container } = render(
      <InternalCard>
        <CardBody><CardText>Body</CardText></CardBody>
      </InternalCard>
    );
    expect(container.querySelector('.sk-card-body')).toBeInTheDocument();
  });

  it('renders CardHeader', () => {
    const { container } = render(
      <InternalCard>
        <CardBody>
          <CardHeader>Header</CardHeader>
          <CardText>Content</CardText>
        </CardBody>
      </InternalCard>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(container.querySelector('.sk-card-body-header')).toBeInTheDocument();
  });

  it('renders CardText', () => {
    const { container } = render(
      <InternalCard>
        <CardBody><CardText>Text content</CardText></CardBody>
      </InternalCard>
    );
    expect(screen.getByText('Text content')).toBeInTheDocument();
    expect(container.querySelector('.sk-card-body-content')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(
      <InternalCard ref={ref}>
        <CardBody><CardText>Content</CardText></CardBody>
      </InternalCard>
    );
    expect(ref).toHaveBeenCalled();
  });
});
