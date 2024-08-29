import React from 'react';
import { AIServiceModuleRow } from './ai-service-module-row';
import { AIServiceModuleWrapper } from './ai-service-module-wrapper';

export interface AIServiceModuleProps extends React.ComponentPropsWithoutRef<'div'> {
  header?: React.ReactNode;
}

export const AIServiceModule = React.forwardRef<HTMLDivElement, AIServiceModuleProps>((props, ref) => {
  const { className, header, ...rest } = props;

  return (
    <AIServiceModuleWrapper ref={ref} {...rest}>
      <AIServiceModuleRow>
        <header className="sk-ai-service-module-header">{header}</header>
      </AIServiceModuleRow>
      <AIServiceModuleRow></AIServiceModuleRow>
    </AIServiceModuleWrapper>
  );
});
