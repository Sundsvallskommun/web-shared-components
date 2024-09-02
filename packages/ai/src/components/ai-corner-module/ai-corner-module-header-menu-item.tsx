import { Button, ButtonProps } from '@sk-web-gui/button';
import { Icon, IconProps } from '@sk-web-gui/icon';
import { Tooltip, TooltipProps } from '@sk-web-gui/tooltip';
import { useOnElementOutside } from '@sk-web-gui/utils';
import React from 'react';

interface AICornerModuleHeaderMenuItemProps extends Omit<React.ComponentPropsWithoutRef<'li'>, 'onClick' | 'children'> {
  onClick?: React.ComponentPropsWithoutRef<'button'>['onClick'];
  buttonProps?: React.ComponentProps<ButtonProps>;
  icon: React.ComponentProps<IconProps>['name'];
  label: string;
}

export const AICornerModuleHeaderMenuItem = React.forwardRef<HTMLLIElement, AICornerModuleHeaderMenuItemProps>(
  (props, ref) => {
    const { className, onClick, buttonProps, icon, label, tabIndex, ...rest } = props;
    const tooltipRef = React.useRef<HTMLElement>(null);
    const [showTooltip, setShowTooltip] = React.useState<boolean>(false);
    const [tooltipPosition, setTooltipPosition] = React.useState<TooltipProps['position']>('above');
    const [tooltipRightOutside, setTooltipRightOutside] = React.useState<boolean>(false);
    const timeout = React.useRef(setTimeout(() => {}));

    useOnElementOutside(
      tooltipRef,
      ({ isOutsideTop, isOutsideRight }) => {
        if (showTooltip && tooltipRef.current) {
          setTooltipPosition(isOutsideTop ? 'below' : 'above');
          setTooltipRightOutside(isOutsideRight);
        } else {
          setTooltipPosition('above');
          setTooltipRightOutside(false);
        }
      },
      [showTooltip, tooltipRef],
      { padding: 20 }
    );

    const handleMouseOver = (show: boolean) => {
      if (show && !showTooltip) {
        timeout.current = setTimeout(() => {
          setShowTooltip(show);
        }, 500);
      } else {
        clearTimeout(timeout.current);
        setShowTooltip(show);
      }
    };

    React.useEffect(() => {
      if (!showTooltip) {
        setTooltipPosition('above');
        setTooltipRightOutside(false);
      }
    }, [showTooltip]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        setShowTooltip(false);
        onClick(event);
      }
    };

    return (
      <li ref={ref} role="none" className="sk-ai-corner-module-header-menu-item" {...rest}>
        <Button
          variant="tertiary"
          size="sm"
          role="menuitem"
          aria-label={label}
          iconButton
          onClick={handleClick}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          onMouseEnter={() => handleMouseOver(true)}
          onMouseLeave={() => handleMouseOver(false)}
          tabIndex={tabIndex}
          {...buttonProps}
        >
          <Icon name={icon} />
        </Button>
        {showTooltip && (
          <Tooltip ref={tooltipRef} position={tooltipPosition} data-rightoutside={tooltipRightOutside}>
            {label}
          </Tooltip>
        )}
      </li>
    );
  }
);
