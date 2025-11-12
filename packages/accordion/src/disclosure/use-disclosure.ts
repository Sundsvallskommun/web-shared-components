import React from 'react';
import { DisclosureDefualtProps } from './disclosure';
import { DisclosureContext, DisclosureHeaderContext } from './disclosure-context';

const useDisclosureContext = () => React.useContext(DisclosureContext);
const useDisclosureHeaderContext = () => React.useContext(DisclosureHeaderContext);

export interface UseDisclosureProps extends DisclosureDefualtProps {
  toggleOpen?: () => void;
  hasLeadingIcon?: boolean;
  setHasLeadingIcon?: (hasLeadingIcon: boolean) => void;
}

export const useDisclosure = (): UseDisclosureProps => {
  const context = useDisclosureContext();

  return { ...context };
};

export const useDisclosureHeader = (): UseDisclosureProps => {
  const context = useDisclosureHeaderContext();

  return { ...context };
};
