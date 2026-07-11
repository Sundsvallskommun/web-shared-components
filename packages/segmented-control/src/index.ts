import SegmentedControlComponent, { SegmentedControlComponentProps } from "./segmented-control";
import { SegmentedControlItem } from "./segmented-control-item";

interface SegmentedControlProps extends React.ForwardRefExoticComponent<SegmentedControlComponentProps> {
  Component: typeof SegmentedControlComponent;
  Item: typeof SegmentedControlItem;
}

const SegmentedControl = {
  ...SegmentedControlComponent,
  Component: SegmentedControlComponent,
  Item: SegmentedControlItem,
} as SegmentedControlProps;

export { SegmentedControl };
export type { SegmentedControlProps, SegmentedControlComponentProps };
export default SegmentedControl;
