import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from './breadcrumb';

describe('Breadcrumb', () => {
  it('renders a nav element', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>
    );
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('renders breadcrumb items', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbLink href="/about">About</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders default separator', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbLink href="/about">About</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>
    );
    const separators = container.querySelectorAll('.sk-breadcrumb-separator');
    expect(separators.length).toBeGreaterThan(0);
  });

  it('renders custom separator', () => {
    render(
      <Breadcrumb separator=">">
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbLink href="/about">About</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('marks current page with aria-current', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem currentPage><BreadcrumbLink href="/about">About</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>
    );
    expect(screen.getByText('About').closest('[aria-current]')).toHaveAttribute('aria-current', 'page');
  });

  it('renders current page as span instead of link', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem currentPage><BreadcrumbLink href="/about">Current</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>
    );
    const current = screen.getByText('Current');
    expect(current.tagName.toLowerCase()).toBe('span');
  });

  it('applies sk-breadcrumb class', () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>
    );
    expect(container.querySelector('.sk-breadcrumb')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(
      <Breadcrumb ref={ref}>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
      </Breadcrumb>
    );
    expect(ref).toHaveBeenCalled();
  });
});
