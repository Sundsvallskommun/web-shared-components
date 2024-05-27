import {
  InputSection as InputSectionComponent,
  InputSectionProps as InputSectionComponentProps,
} from './input-section';
import { InputSectionWrapper } from './input-section-wrapper';
import { InputSectionInput } from './input-section-input';
import { InputSectionButton } from './input-section-button';

interface InputSectionProps extends React.ForwardRefExoticComponent<InputSectionComponentProps> {
  Wrapper: typeof InputSectionWrapper;
  Input: typeof InputSectionInput;
  Button: typeof InputSectionButton;
}

export const InputSection = {
  ...InputSectionComponent,
  Wrapper: InputSectionWrapper,
  Input: InputSectionInput,
  Button: InputSectionButton,
} as InputSectionProps;

export type { InputSectionProps, InputSectionComponentProps };
