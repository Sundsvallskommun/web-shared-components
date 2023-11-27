import { Divider as InternalDivider, DividerProps as InternalDividerProps } from './divider';
import { DividerSection, DividerSectionProps } from './divider-section';
interface DividerProps
  extends InternalDividerProps,
    React.ForwardRefExoticComponent<InternalDividerProps & React.RefAttributes<HTMLElement>> {
  Section: typeof DividerSection;
}

const Divider = InternalDivider as DividerProps;

Divider.Section = DividerSection;

export type { DividerProps, DividerSectionProps };
export { Divider };
