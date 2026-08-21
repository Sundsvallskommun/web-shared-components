import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './pagination';

describe('Pagination', () => {
  const defaultProps = {
    pages: 10,
    activePage: 1,
    changePage: vi.fn(),
  };

  it('renders a nav element', () => {
    const { container } = render(<Pagination {...defaultProps} />);
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('renders page buttons', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('marks active page with aria-current true', () => {
    render(<Pagination {...defaultProps} activePage={3} />);
    const activeButton = screen.getByText('3');
    expect(activeButton).toHaveAttribute('aria-current', 'true');
  });

  it('calls changePage on page click', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Pagination {...defaultProps} changePage={handleChange} />);
    await user.click(screen.getByText('2'));

    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} activePage={1} />);
    const prevButton = screen.getByLabelText(/Föregående sida/);
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} activePage={10} />);
    const nextButton = screen.getByLabelText(/Nästa sida/);
    expect(nextButton).toBeDisabled();
  });

  it('renders ellipsis for many pages', () => {
    const { container } = render(<Pagination {...defaultProps} pages={20} activePage={10} />);
    const separators = container.querySelectorAll('[role="separator"]');
    expect(separators.length).toBeGreaterThan(0);
  });

  it('shows first and last pages by default', () => {
    render(<Pagination {...defaultProps} pages={20} activePage={10} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('hides first page when showFirst is false', () => {
    render(<Pagination {...defaultProps} pages={20} activePage={10} showFirst={false} />);
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  it('applies sk-pagination-list class', () => {
    const { container } = render(<Pagination {...defaultProps} />);
    expect(container.querySelector('.sk-pagination-list')).toBeInTheDocument();
  });
});
