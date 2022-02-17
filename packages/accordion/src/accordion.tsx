import { Spinner } from "@sk-web-gui/spinner";
import { DefaultProps } from "@sk-web-gui/theme";
import { cx, __DEV__ } from "@sk-web-gui/utils";
import * as React from "react";

import { useAccordionClass } from "./styles";

interface IAccordionProps extends DefaultProps {
  initalOpen?: boolean;
  accordionTitle: string;

  /* Makes accordion disabled */
  disabled?: boolean;
  /* Set the accordion color */
  color?: string;
  /* React node */
  children?: React.ReactNode;
}

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    IAccordionProps {}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const {
      disabled: _disabled,
      initalOpen,
      accordionTitle,
      children,
      className,
      color,
      ...rest
    } = props;

    const disabled = _disabled;
    /*const classes = useAccordionClass({
      disabled,
    });*/

    const [accordionOpen, setAccordionOpen] = React.useState(initalOpen ?? false);

    return (
      <div
        data-color={color ? color : undefined}
        //className={cx(classes, className)}
        className={cx(
          'accordion',
          accordionOpen ? `accordion-is-open` : undefined,
        )}
        {...rest}
      >
        <div className="accordion-header">
          <button className="accordion-toggle" aria-expanded={accordionOpen} onClick={() => setAccordionOpen(!accordionOpen)}>
            <span>{accordionTitle}</span>
            <span className="ml-auto material-icons" aria-hidden="true">{ accordionOpen ? 'remove' : 'add'}</span>
          </button>
        </div>
        <div className="accordion-body" aria-hidden={!accordionOpen}>
          {children}
        </div>
      </div>
    );
  }
);

if (__DEV__) {
  Accordion.displayName = "Accordion";
}
