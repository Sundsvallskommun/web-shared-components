import React from 'react';
import { useDebounceValue } from 'usehooks-ts';

export interface UseOnElementOutsideOptions {
  /**
   * Extra space added to width and height of the reference element.
   * If added, the callback will return true this amount of pixles
   * before it is actually outside of the window.
   * @default 0
   */
  padding?: number;
  /**
   * Adds an eventlistener to the window that checks the values on scroll.
   * @default true
   */
  updateOnScroll?: boolean;
  /**
   * Adds an eventlistener to the window that checks the values on resize.
   * @default true
   */
  updateOnResize?: boolean;
  /**
   * Time to delay scroll and resize values in ms.
   * @default 50
   */
  delay?: number;
}

type Callback = (callbackProperties: {
  /** Returns true if any part of the element is outside any part of the window */
  isOutside: boolean;
  /** Returns true if any part of the element is outside the top of the window */
  isOutsideTop: boolean;
  /** Returns true if any part of the element is outside the bottom of the window */
  isOutsideBottom: boolean;
  /** Returns true if any part of the element is outside the left of the window */
  isOutsideLeft: boolean;
  /** Returns true if any part of the element is outside the right of the window */
  isOutsideRight: boolean;
}) => void;

export const useOnElementOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: Callback,
  dependencies: React.DependencyList,
  options?: UseOnElementOutsideOptions
) => {
  const defaultOptions = { updateOnScroll: true, updateOnResize: true, delay: 50, padding: 0, ...options };

  const [isOutsideTop, setIsOutsideTop] = React.useState<boolean>(false);
  const [isOutsideBottom, setIsOutsideBottom] = React.useState<boolean>(false);
  const [isOutsideLeft, setIsOutsideLeft] = React.useState<boolean>(false);
  const [isOutsideRight, setIsOutsideRight] = React.useState<boolean>(false);
  const [scrollX, setScrollX] = useDebounceValue<number>(0, defaultOptions.delay);
  const [scrollY, setScrollY] = useDebounceValue<number>(0, defaultOptions.delay);
  const [winWidth, setWinWidth] = useDebounceValue<number>(0, defaultOptions.delay);
  const [winHeight, setWinHeight] = useDebounceValue<number>(0, defaultOptions.delay);

  const isOutside = isOutsideTop || isOutsideBottom || isOutsideLeft || isOutsideRight;

  const handlePosition = () => {
    if (ref.current) {
      const positions = ref.current.getBoundingClientRect();

      if (positions) {
        const height = positions.height + defaultOptions.padding;
        const width = positions.width + defaultOptions.padding;

        setIsOutsideTop(positions.top < defaultOptions.padding);
        setIsOutsideBottom(window.innerHeight - positions.top < height);
        setIsOutsideLeft(positions.left < defaultOptions.padding);
        setIsOutsideRight(window.innerWidth - positions.left < width);
      }
    }
  };

  React.useEffect(() => {
    handlePosition();
  }, dependencies);

  React.useEffect(() => {
    const handleScrollUpdate = () => {
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    };

    if (defaultOptions.updateOnScroll) {
      window.addEventListener('scroll', handleScrollUpdate);
    }

    return () => {
      window.removeEventListener('scroll', handleScrollUpdate);
    };
  }, [defaultOptions.updateOnScroll]);

  React.useEffect(() => {
    const handleResize = () => {
      setWinHeight(window.innerHeight);
      setWinWidth(window.innerWidth);
    };
    if (defaultOptions.updateOnResize) {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [defaultOptions.updateOnResize]);

  React.useEffect(() => {
    if (defaultOptions.updateOnScroll) {
      handlePosition();
    }
  }, [scrollX, scrollY, defaultOptions?.updateOnScroll]);

  React.useEffect(() => {
    if (defaultOptions.updateOnResize) {
      handlePosition();
    }
  }, [winHeight, winWidth, defaultOptions?.updateOnResize]);

  React.useEffect(() => {
    callback({ isOutside, isOutsideTop, isOutsideBottom, isOutsideLeft, isOutsideRight });
  }, [isOutside, isOutsideTop, isOutsideBottom, isOutsideLeft, isOutsideRight]);
};
