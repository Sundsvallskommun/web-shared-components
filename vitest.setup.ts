import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, expect, vi, type MockInstance } from 'vitest';

let consoleError: MockInstance;
let consoleWarn: MockInstance;

beforeEach(() => {
  consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
  consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();

  expect(consoleError.mock.calls, 'Unexpected console.error during test').toEqual([]);
  expect(consoleWarn.mock.calls, 'Unexpected console.warn during test').toEqual([]);
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
class ResizeObserverMock implements ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

window.ResizeObserver = ResizeObserverMock;
