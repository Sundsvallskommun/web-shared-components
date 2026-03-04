import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccordionComponent } from './accordion/accordion';
import { AccordionItemComponent } from './accordion/accordion-item';
import { DisclosureHeader } from './disclosure/disclosure-header';
import { DisclosureHeaderTitle } from './disclosure/disclosure-header-title';
import { DisclosureHeaderButton } from './disclosure/disclosure-header-button';
import { DisclosureContent } from './disclosure/disclosure-content';

const renderAccordion = (props = {}) =>
  render(
    <AccordionComponent {...props}>
      <AccordionItemComponent>
        <DisclosureHeader>
          <DisclosureHeaderTitle>Item 1</DisclosureHeaderTitle>
          <DisclosureHeaderButton />
        </DisclosureHeader>
        <DisclosureContent>Content 1</DisclosureContent>
      </AccordionItemComponent>
      <AccordionItemComponent>
        <DisclosureHeader>
          <DisclosureHeaderTitle>Item 2</DisclosureHeaderTitle>
          <DisclosureHeaderButton />
        </DisclosureHeader>
        <DisclosureContent>Content 2</DisclosureContent>
      </AccordionItemComponent>
    </AccordionComponent>
  );

describe('Accordion', () => {
  it('renders accordion items', () => {
    renderAccordion();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('items are closed by default', () => {
    renderAccordion();
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('toggles item open on click', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);

    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles item closed on second click', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    await user.click(buttons[0]);

    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes other items when allowMultipleOpen is false', async () => {
    const user = userEvent.setup();
    renderAccordion({ allowMultipleOpen: false });

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    await user.click(buttons[1]);

    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });

  it('keeps multiple items open when allowMultipleOpen is true', async () => {
    const user = userEvent.setup();
    renderAccordion({ allowMultipleOpen: true });

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    await user.click(buttons[1]);

    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies inverted data attribute', () => {
    const { container } = renderAccordion({ inverted: true });
    expect(container.querySelector('[data-inverted]')).toBeInTheDocument();
  });

  it('applies sk-accordion class', () => {
    const { container } = renderAccordion();
    expect(container.querySelector('.sk-accordion')).toBeInTheDocument();
  });

  it('renders content when opened', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);

    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(
      <AccordionComponent ref={ref}>
        <AccordionItemComponent>
          <DisclosureHeader>
            <DisclosureHeaderTitle>Item</DisclosureHeaderTitle>
            <DisclosureHeaderButton />
          </DisclosureHeader>
          <DisclosureContent>Content</DisclosureContent>
        </AccordionItemComponent>
      </AccordionComponent>
    );
    expect(ref).toHaveBeenCalled();
  });
});
