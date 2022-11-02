import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { DefaultProps } from '@sk-web-gui/theme';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { useRef } from 'react';

import { useAccordionClass } from './styles';

interface IAccordionProps extends DefaultProps {
  initalOpen?: boolean;
  accordionTitle: string;
  accordionSubTitle?: string;

  /* Makes accordion disabled */
  disabled?: boolean;
  /* Set the accordion color */
  color?: string;
  /** Controls accordion appearance */
  variant?: 'solid' | 'outline';
  /* the element or component to use in place of `h2` */
  as?: React.ElementType;
  /* React node */
  children?: React.ReactNode;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement>, IAccordionProps {}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const {
    disabled: _disabled,
    initalOpen,
    accordionTitle,
    accordionSubTitle,
    children,
    className,
    color,
    variant = 'solid',
    as: Comp = 'h2',
    ...rest
  } = props;

  const disabled = _disabled;
  const classes = useAccordionClass({
    variant,
    disabled,
  });

  const [accordionOpen, setAccordionOpen] = React.useState(initalOpen ?? false);
  const contentEl = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const config = { childList: true, subtree: true };
    const callback: MutationCallback = (mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          const newHeight = 'auto';
          if (typeof newHeight !== 'undefined' && contentEl.current) {
            contentEl.current.style.height = newHeight;
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    if (contentEl.current) {
      observer.observe(contentEl.current, config);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      data-color={color ? color : undefined}
      className={cx(accordionOpen ? `accordion-is-open` : undefined, classes, className)}
      {...rest}
    >
      <div className="accordion-header">
        <button
          type="button"
          className="accordion-toggle"
          aria-expanded={accordionOpen}
          onClick={() => {
            if (contentEl.current) {
              contentEl.current.style.height = `${contentEl.current?.scrollHeight}px`;
            }
            setTimeout(() => {
              setAccordionOpen(!accordionOpen);
            }, 0);
          }}
        >
          <div>
            <Comp className="accordion-title">{accordionTitle}</Comp>
            {accordionSubTitle && <p className="accordion-subtitle">{accordionSubTitle}</p>}
          </div>
          {accordionOpen ? (
            <RemoveOutlinedIcon className="accordion-header-icon" />
          ) : (
            <AddOutlinedIcon className="accordion-header-icon" />
          )}
        </button>
      </div>
      <div
        className="accordion-body"
        aria-hidden={!accordionOpen}
        ref={contentEl}
        style={accordionOpen ? { height: contentEl?.current?.scrollHeight } : { height: '0' }}
      >
        {children}
      </div>
    </div>
  );
});

if (__DEV__) {
  Accordion.displayName = 'Accordion';
}
