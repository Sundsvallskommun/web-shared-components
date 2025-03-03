import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import React from 'react';
import { usePaginationClass } from './styles';
import { Select } from '@sk-web-gui/forms';
import { Icon } from '@sk-web-gui/icon';
import { Button } from '@sk-web-gui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface PaginationProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  /* Total amount of pages */
  pages: number;
  /* Currently active page */
  activePage: number;
  /* Handles page number change */
  changePage: (page: number) => void;
  /* Number of pages shown before current page */
  pagesBefore?: number;
  /* Number of pages shown after current page */
  pagesAfter?: number;
  /* Always show first page */
  showFirst?: boolean;
  /* Always show last page */
  showLast?: boolean;
  /* Label on next button */
  nextLabel?: string;
  /* Label on previous button */
  prevLabel?: string;
  /* Hides the text on prev and next buttons */
  hidePrevNextLabel?: boolean;
  /* Stretch width to fit container */
  fitContainer?: boolean;
  /* Always show same number of pages */
  showConstantPages?: boolean;
  /* Show as select */
  asSelect?: boolean;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>((props, ref) => {
  const {
    pages = 1,
    activePage = 1,
    changePage,
    showFirst = true,
    showLast = true,
    pagesBefore = 1,
    pagesAfter = 1,
    className,
    hidePrevNextLabel = true,
    nextLabel = 'Nästa',
    prevLabel = 'Föregående',
    fitContainer = false,
    showConstantPages,
    asSelect = false,
    ...rest
  } = props;

  const classes = usePaginationClass({
    fitContainer,
  });

  const minPage = 1;
  const [currentPage, setCurrentPage] = React.useState(1);

  const extraEnd = showLast ? 1 : 0;
  const shownBefore = showConstantPages
    ? pages - (currentPage + extraEnd) < pagesAfter
      ? pagesBefore + pagesAfter - (pages - (currentPage + extraEnd))
      : pagesBefore
    : pagesBefore;
  const extraStart = showFirst ? 1 : 0;
  const shownAfter = showConstantPages
    ? currentPage - extraStart <= pagesBefore
      ? pagesAfter + pagesBefore - (currentPage - (extraStart + 1))
      : pagesAfter
    : pagesAfter;

  const handleClick = (pageNumber: number) => {
    changePage(pageNumber);
  };

  const shouldShowLabel: (idx: number, cP: number, pBaA: number) => boolean = (idx) =>
    idx !== 0 && idx !== pages - 1 && idx > currentPage - shownBefore - 2 && idx < currentPage + shownAfter;

  React.useEffect(() => {
    const internalHandleChange = (page: number) => {
      if (page > minPage - 1 && page < pages + 1) {
        setCurrentPage(page);
      }
    };

    internalHandleChange(activePage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  const pageLabel = (pageNumber: number) => {
    const active = currentPage === pageNumber;
    return (
      <button
        tabIndex={-1}
        onKeyDown={keyboardHandler}
        type="button"
        role="menuitem"
        aria-current={active}
        aria-label={`Sida ${pageNumber} av ${pages}.`}
        className={cx(`sk-pagination-pageLabel`)}
        onClick={() => handleClick(pageNumber)}
        key={`page${pageNumber}`}
      >
        {pageNumber}
      </button>
    );
  };

  const prevNextButton: (props: {
    next: boolean;
    label: string;
    icon: React.JSX.Element;
    triggerNumber: number;
    step: number;
    reverse?: boolean;
    tabIndex?: number;
    index: number;
  }) => React.JSX.Element = ({ next, label, icon, triggerNumber = 1, step = 1, tabIndex }) => {
    const isDisabled = currentPage === triggerNumber;
    return (
      <Button
        onKeyDown={keyboardHandler}
        tabIndex={tabIndex}
        role="menuitem"
        type="button"
        aria-label={`${next ? 'Nästa' : 'Föregående'} sida ${next ? currentPage + 1 : currentPage - 1} av ${pages}.`}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        onClick={() => isDisabled || handleClick(currentPage + step)}
        className={cx(`sk-pagination-prevNextButton`)}
        leftIcon={next === false ? icon : undefined}
        rightIcon={next === true ? icon : undefined}
        iconButton={hidePrevNextLabel}
        rounded
        size="sm"
      >
        {!hidePrevNextLabel && <span className={cx(`sk-pagination-prevNextButton-label`)}>{label}</span>}
      </Button>
    );
  };

  const ellipsis = (
    <span className={cx('sk-pagination-prevNextButton-ellipsis')} role="separator">
      …
    </span>
  );
  const goToNextButton = (button: HTMLElement, index: number, total: number) => {
    if (index + 1 === total) {
      goToFirstButton(button, total);
    } else {
      const next = button?.parentElement?.nextSibling?.firstChild as HTMLElement;
      if (
        next &&
        next.attributes.getNamedItem('role')?.value === 'menuitem' &&
        next.attributes.getNamedItem('aria-disabled')?.value !== 'true'
      ) {
        next.focus();
      } else {
        goToNextButton(next, index + 1, total);
      }
    }
  };

  const goToPreviousButton = (button: HTMLElement, index: number, total: number) => {
    if (index === 0) {
      goToLastButton(button, total);
    } else {
      const previous = button?.parentElement?.previousSibling?.firstChild as HTMLElement;

      if (
        previous &&
        previous.attributes.getNamedItem('role')?.value === 'menuitem' &&
        previous.attributes.getNamedItem('aria-disabled')?.value !== 'true'
      ) {
        previous.focus();
      } else {
        goToPreviousButton(previous, index - 1, total);
      }
    }
  };

  const goToFirstButton = (button: HTMLElement, total: number) => {
    const first = button?.parentElement?.parentElement?.firstChild?.firstChild as HTMLElement;
    if (first && first.attributes.getNamedItem('aria-disabled')?.value !== 'true') {
      first.focus();
    } else {
      goToNextButton(first, 0, total);
    }
  };

  const goToLastButton = (button: HTMLElement, total: number) => {
    const last = button?.parentElement?.parentElement?.lastChild?.firstChild as HTMLElement;
    if (last && last.attributes.getNamedItem('aria-disabled')?.value !== 'true') {
      last.focus();
    } else {
      goToPreviousButton(last, total - 1, total);
    }
  };

  const keyboardHandler = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const allItems = Array.from(event.currentTarget?.parentElement?.parentElement?.children as HTMLCollection);
    const total = allItems?.length;
    const index = event.currentTarget?.parentElement ? allItems.indexOf(event.currentTarget?.parentElement) : -1;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      goToNextButton(event.currentTarget, index, total);
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      goToPreviousButton(event.currentTarget, index, total);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      goToFirstButton(event.currentTarget, total);
    }

    if (event.key === 'End') {
      event.preventDefault();
      goToLastButton(event.currentTarget, total);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (index + 1 === total && activePage === pages - 1) {
        goToFirstButton(event.currentTarget, total);
      }

      if (index === 0 && activePage === minPage + 1) {
        goToLastButton(event.currentTarget, total);
      }
      event.currentTarget.click();
    }
  };

  return (
    <nav
      className={cx(classes, className)}
      {...rest}
      aria-label="pagination"
      ref={ref}
      data-hideprevnextlabel={hidePrevNextLabel}
    >
      {asSelect ? (
        <Select
          size="sm"
          aria-label="Gå till sida"
          value={currentPage.toString()}
          onSelectValue={(value: string) => handleClick(parseInt(value, 10))}
        >
          {[...Array(pages)].map((_, idx: number) => (
            <Select.Option key={`selectPage-${idx}`} value={(idx + 1).toString()}>
              {idx + 1}
            </Select.Option>
          ))}
        </Select>
      ) : (
        <ul className="sk-pagination-list" role="menubar" aria-orientation="horizontal">
          <li className="sk-pagination-list-item prev-next prev" role="none">
            {prevNextButton({
              next: false,
              label: prevLabel,
              icon: <Icon icon={<ArrowLeft />} size="fit" />,
              triggerNumber: minPage,
              step: -1,
              tabIndex: activePage == pages ? undefined : -1,
              index: 0,
            })}
          </li>
          {(activePage === 1 || showFirst || pagesBefore >= currentPage - 1 || pages <= shownBefore + shownAfter) && (
            <li className="sk-pagination-list-item" role="none">
              {pageLabel(1)}
            </li>
          )}
          {currentPage > pagesBefore + 2 && showFirst && (
            <li className="sk-pagination-list-item ellipsis">{ellipsis}</li>
          )}
          {[...Array(pages)].map((_, idx: number) => {
            return (
              shouldShowLabel(idx, currentPage, pagesBefore) && (
                <li key={`pageLabel-${idx}`} className="sk-pagination-list-item" role="none">
                  {pageLabel(idx + 1)}
                </li>
              )
            );
          })}
          {currentPage < pages - pagesAfter - 1 && showLast && (
            <li className="sk-pagination-list-item ellipsis" role="none">
              {ellipsis}
            </li>
          )}
          {(showLast ||
            activePage === pages ||
            pagesAfter > pages - (currentPage + 1) ||
            pages <= shownBefore + shownAfter) &&
            pages > 1 && (
              <li className="sk-pagination-list-item" role="none">
                {pageLabel(pages)}
              </li>
            )}
          <li className="sk-pagination-list-item  prev-next next" role="none">
            {prevNextButton({
              next: true,
              label: nextLabel,
              icon: <Icon icon={<ArrowRight />} size="fit" />,
              triggerNumber: pages,
              step: 1,
              tabIndex: activePage == pages ? -1 : undefined,
              index: pages + 1,
            })}
          </li>
        </ul>
      )}
    </nav>
  );
});

if (__DEV__) {
  Pagination.displayName = 'Pagination';
}

export default Pagination;
