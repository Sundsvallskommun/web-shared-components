/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

type ReactRef<T> = React.Ref<T> | React.RefObject<T>;

export function setRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    // @ts-ignore
    ref.current = value;
  }
}

export function useForkRef<T = any>(refA: ReactRef<T> | undefined | null, refB: ReactRef<T> | undefined | null) {
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue: T) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
