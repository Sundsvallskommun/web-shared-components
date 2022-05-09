import { Spinner } from "@sk-web-gui/spinner";
import { DefaultProps } from "@sk-web-gui/theme";
import { cx, __DEV__ } from "@sk-web-gui/utils";
import * as React from "react";
import { useRef } from "react";

import { useAccordionClass } from "./styles";

interface IAccordionProps extends DefaultProps {
  initalOpen?: boolean;
  accordionTitle: string;

  /* Makes accordion disabled */
  disabled?: boolean;
  /* Set the accordion color */
  color?: string;
  /* the element or component to use in place of `h2` */
  as?: React.ElementType;
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
      as: Comp = 'h2',
      ...rest
    } = props;

    const disabled = _disabled;
    const classes = useAccordionClass({
      disabled,
    });

    const [accordionOpen, setAccordionOpen] = React.useState(initalOpen ?? false);
    const contentEl = useRef<HTMLDivElement>(null);

    return (
      <div
        data-color={color ? color : undefined}
        className={cx(
          accordionOpen ? `accordion-is-open` : undefined,
          classes,
          className,
        )}
        {...rest}
      >
        <div className="accordion-header">
          <button type="button" className="accordion-toggle" aria-expanded={accordionOpen} onClick={() => setAccordionOpen(!accordionOpen)}>
            <Comp className="text-lg leading-lg">{accordionTitle}</Comp>
            <span className="ml-auto material-icons" aria-hidden="true">{ accordionOpen ? 'remove' : 'add'}</span>
          </button>
        </div>
        <div className="accordion-body" aria-hidden={!accordionOpen} ref={contentEl} style={
          (accordionOpen)
            ? { height: contentEl?.current?.scrollHeight }
            : { height: "0" }
        }>
          {children}
        </div>
      </div>
    );
  }
);

if (__DEV__) {
  Accordion.displayName = "Accordion";
}
