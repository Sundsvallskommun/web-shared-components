import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React, { useRef } from 'react';
import { useId } from '@reach/auto-id';
import { useDisclosureClass } from './styles';
import { useAccordion } from '../accordion/accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface IDisclosureProps extends DefaultProps {
  initalOpen?: boolean;
  header: React.ReactNode;
  subTitle?: React.ReactNode;
  /* Makes disclosure disabled */
  disabled?: boolean;
  /* Set the disclosure color */
  color?: string;
  /** Controls disclosure appearance */
  variant?: 'solid' | 'outline' | 'plain';
  noMargin?: boolean;
  /* Element to wrap header in. Defaults to h2 */
  headerAs?: React.ElementType;
  /* React node */
  children?: React.ReactNode;
  /* Id of the panel */
  id?: string;
  /* Icon to be used when closed */
  expandIcon?: React.ReactNode;
  /* Icon to be used when open */
  closeIcon?: React.ReactNode;
  /* Gives alert colors */
  alert?: boolean;
  /* Gives error colors */
  error?: boolean;
}

export interface DisclosureProps extends React.HTMLAttributes<HTMLDivElement>, IDisclosureProps {}

export const Disclosure = React.forwardRef<HTMLDivElement, DisclosureProps>((props, ref) => {
  const {
    disabled,
    initalOpen,
    header,
    subTitle,
    children,
    className,
    color: _color,
    variant: _variant,
    noMargin: _noMargin,
    headerAs,
    id: _id,
    expandIcon: _expandIcon,
    closeIcon: _closeIcon,
    alert: _alert,
    error: _error,
    ...rest
  } = props;
  const { open, onClose, onOpen, ...context } = useAccordion();

  const variant = _variant || context.variant || 'solid';
  const noMargin = _noMargin !== undefined ? _noMargin : context.noMargin !== undefined ? context.noMargin : undefined;
  const color = _color || context.color;
  const Comp = headerAs || context.headerAs || 'h2';
  const expandIcon =
    _expandIcon || context.expandIcon || variant === 'plain' ? <ExpandMoreIcon /> : <AddOutlinedIcon />;
  const closeIcon =
    _closeIcon || context.closeIcon || variant === 'plain' ? <ExpandLessIcon /> : <RemoveOutlinedIcon />;
  const alert =
    _alert !== undefined || _error !== undefined ? _alert : context.alert !== undefined ? context.alert : false;
  const error =
    _alert !== undefined || _error !== undefined ? _error : context.error !== undefined ? context.error : false;

  const classes = useDisclosureClass({
    variant,
    disabled,
  });

  const [declaredObserver, setDeclaredObserver] = React.useState<MutationObserver>();
  const [disclosureOpen, setDisclosureOpen] = React.useState(initalOpen || false);
  const contentEl = useRef<HTMLDivElement>(null);
  const id = _id || `sk-disclosure-${useId()}`;

  React.useEffect(() => {
    if (onClose && onOpen) {
      if (open?.includes(id)) {
        setDisclosureOpen(true);
      }
      if (!open?.includes(id)) {
        setDisclosureOpen(false);
      }
    }
  }, [open]);

  React.useEffect(() => {
    if (declaredObserver) {
      declaredObserver.disconnect();
    }
    const config = { childList: true, subtree: true };
    const callback: MutationCallback = (mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          const newHeight = 'auto';
          if (typeof newHeight !== 'undefined' && contentEl.current && disclosureOpen) {
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
  }, [disclosureOpen]);

  React.useEffect(() => {
    initalOpen && onOpen && onOpen(id);
  }, [initalOpen]);

  const onClick = () => {
    if (!disabled) {
      if (disclosureOpen) {
        onClose && onClose(id);
      } else {
        onOpen && onOpen(id);
      }

      if (contentEl.current) {
        contentEl.current.style.height = `${contentEl.current?.scrollHeight}px`;
      }
      setTimeout(() => {
        setDisclosureOpen(!disclosureOpen);
      }, 0);
    }
  };

  const handleKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onClick();
    }
  };

  return (
    <div
      ref={ref}
      data-color={color ? color : undefined}
      className={cx(disclosureOpen ? 'sk-disclosure-is-open' : undefined, classes, className)}
      data-alert={alert}
      data-error={error}
      id={id}
      data-open={disclosureOpen}
      {...rest}
    >
      <div
        className="sk-disclosure-header"
        tabIndex={disabled ? -1 : 0}
        onClick={onClick}
        onKeyUp={handleKeyboard}
        role="button"
        aria-disabled={disabled ? disabled : undefined}
        data-disabled={disabled ? disabled : undefined}
        id={`${id}-header`}
        aria-controls={`${id}-content`}
        aria-expanded={disclosureOpen}
      >
        <div className="sk-disclosure-toggle">
          <div className="w-full">
            <Comp className="sk-disclosure-title">{header}</Comp>
            {subTitle && <p className="sk-disclosure-subtitle">{subTitle}</p>}
          </div>
          <div className="sk-disclosure-header-icon">{disclosureOpen ? closeIcon : expandIcon}</div>
        </div>
      </div>
      <div
        className={`sk-disclosure-body ${disclosureOpen && 'overflow-visible'} ${noMargin ? '' : 'm-lg'}`}
        aria-hidden={!disclosureOpen}
        ref={contentEl}
        style={disclosureOpen ? { height: contentEl?.current?.scrollHeight } : { height: '0' }}
      >
        <div role="region" aria-labelledby={`${id}-header`} id={`${id}-content`}>
          {children}
        </div>
      </div>
    </div>
  );
});

if (__DEV__) {
  Disclosure.displayName = 'Disclosure';
}

export default Disclosure;
