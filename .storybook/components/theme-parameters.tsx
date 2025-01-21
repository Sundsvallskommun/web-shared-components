import { useContext } from 'react';
import { ThemeContext } from './theme-context';
import { MemoizedDocsContainer, MemoizedGuiProvider } from './theme-helpers';
import { defaultTheme } from '@sk-web-gui/theme';

interface ParametersContainerProps {
  children: any;
  context: any;
}
export const ParametersContainer: React.FC<ParametersContainerProps> = ({ children, context }) => {
  // Access the dark mode value from context
  const colorScheme = useContext(ThemeContext);

  return (
    <div className="docs-wrapper">
      <MemoizedDocsContainer context={context}>
        <MemoizedGuiProvider theme={defaultTheme} colorScheme={colorScheme}>
          {children}
        </MemoizedGuiProvider>
      </MemoizedDocsContainer>
    </div>
  );
};
