import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { NavigationBarComponent } from './navigation-bar';
import { NavigationBarItem } from './navigation-bar-item';

describe('NavigationBar', () => {
  it('renders a ul element', () => {
    const { container } = render(
      <NavigationBarComponent>
        <NavigationBarItem><button>Item 1</button></NavigationBarItem>
      </NavigationBarComponent>
    );
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  it('applies sk-navigationbar class', () => {
    const { container } = render(
      <NavigationBarComponent>
        <NavigationBarItem><button>Item 1</button></NavigationBarItem>
      </NavigationBarComponent>
    );
    expect(container.querySelector('.sk-navigationbar')).toBeInTheDocument();
  });

  it('applies color data attribute', () => {
    const { container } = render(
      <NavigationBarComponent color="vattjom">
        <NavigationBarItem><button>Item 1</button></NavigationBarItem>
      </NavigationBarComponent>
    );
    expect(container.querySelector('.sk-navigationbar')).toHaveAttribute('data-color', 'vattjom');
  });

  it('applies background data attribute', () => {
    const { container } = render(
      <NavigationBarComponent showBackground>
        <NavigationBarItem><button>Item 1</button></NavigationBarItem>
      </NavigationBarComponent>
    );
    expect(container.querySelector('.sk-navigationbar')).toHaveAttribute('data-background', 'true');
  });

  it('applies size data attribute', () => {
    const { container } = render(
      <NavigationBarComponent size="md">
        <NavigationBarItem><button>Item 1</button></NavigationBarItem>
      </NavigationBarComponent>
    );
    expect(container.querySelector('.sk-navigationbar')).toHaveAttribute('data-size', 'md');
  });

  it('renders navigation items', () => {
    const { container } = render(
      <NavigationBarComponent>
        <NavigationBarItem><button>First</button></NavigationBarItem>
        <NavigationBarItem><button>Second</button></NavigationBarItem>
      </NavigationBarComponent>
    );
    const items = container.querySelectorAll('.sk-navigationbar-item');
    expect(items.length).toBe(2);
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(
      <NavigationBarComponent ref={ref}>
        <NavigationBarItem><button>Item</button></NavigationBarItem>
      </NavigationBarComponent>
    );
    expect(ref).toHaveBeenCalled();
  });
});
