import React, { useRef } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';

import { useAccordionClass } from './styles';

interface IAccordionProps extends DefaultProps {
  initalOpen?: boolean;
  accordionTitle: React.ReactNode;
  accordionSubTitle?: React.ReactNode;

  /* Makes accordion disabled */
  disabled?: boolean;
  /* Set the accordion color */
  color?: string;
  /** Controls accordion appearance */
  variant?: 'solid' | 'outline' | 'alert' | 'error';
  /* the element or component to use in place of `h2` */
  noMargin?: boolean;
  as?: React.ElementType;
  /* React node */
  children?: React.ReactNode;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement>, IAccordionProps {}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const {
    disabled,
    initalOpen,
    accordionTitle,
    accordionSubTitle,
    children,
    className,
    color,
    variant = 'solid',
    noMargin,
    as: Comp = 'h2',
    ...rest
  } = props;

  const classes = useAccordionClass({
    variant,
    disabled,
  });

  const [declaredObserver, setDeclaredObserver] = React.useState<MutationObserver>();
  const [accordionOpen, setAccordionOpen] = React.useState(initalOpen ?? false);
  const contentEl = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (declaredObserver) {
      declaredObserver.disconnect();
    }
    const config = { childList: true, subtree: true };
    const callback: MutationCallback = (mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          const newHeight = 'auto';
          if (typeof newHeight !== 'undefined' && contentEl.current && accordionOpen) {
            contentEl.current.style.height = newHeight;
          }
        }
      }
    };
    const observer = new MutationObserver(callback);
    if (contentEl.current) {
      observer.observe(contentEl.current, config);
    }
    setDeclaredObserver(observer);
    return () => {
      observer.disconnect();
    };
  }, [accordionOpen]);

  const onClick = () => {
    if (contentEl.current) {
      contentEl.current.style.height = `${contentEl.current?.scrollHeight}px`;
    }
    setTimeout(() => {
      setAccordionOpen(!accordionOpen);
    }, 0);
  };

  let openType;
  if (variant === 'alert') openType = 'accordion-is-open-alert';
  else if (variant === 'error') openType = 'accordion-is-open-error';
  else openType = 'accordion-is-open';

  return (
    <div
      data-color={color ? color : undefined}
      className={cx(accordionOpen ? openType : undefined, classes, className)}
      {...rest}
    >
      <div className="accordion-header">
        <button
          aria-disabled={disabled ? disabled : undefined}
          disabled={disabled}
          type="button"
          className="accordion-toggle"
          aria-expanded={accordionOpen}
          onClick={onClick}
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
        className={`accordion-body ${accordionOpen && 'overflow-visible'} ${noMargin ? '' : 'm-lg'}`}
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

export default Accordion;
