import React from 'react';
import { UseAccordionProps } from './accordion';
import { AccordionContext } from './context';

const useAccordionContext = () => React.useContext(AccordionContext);

interface UseAccordionData extends UseAccordionProps {
  open?: string[];
  onClose?: (id: string) => void;
  onOpen?: (id: string) => void;
}

export const useAccordion = (): UseAccordionData => {
  const context = useAccordionContext();

  return { ...context };
};
