import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressStepper } from './progress-stepper';

describe('ProgressStepper', () => {
  const steps = ['Step 1', 'Step 2', 'Step 3'];

  it('renders all steps', () => {
    render(<ProgressStepper steps={steps} labelPosition="bottom" />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('marks current step', () => {
    const { container } = render(<ProgressStepper steps={steps} current={1} labelPosition="bottom" />);
    const currentSteps = container.querySelectorAll('[data-progress="current"]');
    expect(currentSteps).toHaveLength(1);
  });

  it('marks completed steps', () => {
    const { container } = render(<ProgressStepper steps={steps} current={2} labelPosition="bottom" />);
    const doneSteps = container.querySelectorAll('[data-progress="done"]');
    expect(doneSteps.length).toBeGreaterThanOrEqual(1);
  });

  it('renders vertically when vertical is true', () => {
    const { container } = render(<ProgressStepper steps={steps} vertical labelPosition="right" />);
    expect(container.querySelector('.vertical')).toBeInTheDocument();
  });

  it('renders horizontally by default', () => {
    const { container } = render(<ProgressStepper steps={steps} labelPosition="bottom" />);
    expect(container.querySelector('.horizontal')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<ProgressStepper ref={ref} steps={steps} labelPosition="bottom" />);
    expect(ref).toHaveBeenCalled();
  });
});
