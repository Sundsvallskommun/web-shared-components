import { useMemo } from 'react';

export interface CreateMemoClassProps {
  variant?: string;
  size?: 'sm' | 'md' | 'lg' | string;
  disabled?: boolean;
  [key: string]: unknown;
}

export function createMemoClass(func: (props: CreateMemoClassProps) => string) {
  return function useMemoClass(args: CreateMemoClassProps) {
    const dependencies: unknown[] =
      typeof args === 'object' && args !== null
        ? Object.keys(args)
            .filter((key) => key !== 'theme')
            .map((key) => args[key as keyof CreateMemoClassProps])
        : [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => func(args), dependencies);
  };
}
