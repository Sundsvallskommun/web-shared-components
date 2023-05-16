import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import React, { KeyboardEvent, useEffect, useState } from 'react';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { usePaginationClass } from './styles';
import { Select } from '@sk-web-gui/forms';

export interface IPaginationProps extends DefaultProps {
  /* Total amount of pages */
  pages: number;
  /* Currently active page */
  activePage: number;
  /* Handles page number change */
  changePage: (page: number) => void;
  /* Size of the button */
  size?: 'sm' | 'md' | 'lg';
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

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement>, IPaginationProps {}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>((props, ref) => {
  const {
    pages = 1,
    activePage = 1,
    changePage,
    children,
    size = 'md',
    showFirst = true,
    showLast = true,
    pagesBefore = 2,
    pagesAfter = 2,
    className,
    hidePrevNextLabel,
    nextLabel = 'Nästa',
    prevLabel = 'Föregående',
    fitContainer = false,
    showConstantPages,
    asSelect = false,
    ...rest
  } = props;

  const classes = usePaginationClass({
    size,
    fitContainer,
  });

  const minPage = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const internalHandleChange = (page: number) => {
    if (page > minPage - 1 && page < pages + 1) {
      setCurrentPage(page);
    }
  };

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
    internalHandleChange(pageNumber);
  };

  const shouldShowLabel: (idx: number, cP: number, pBaA: number) => boolean = (idx) =>
    idx !== 0 && idx !== pages - 1 && idx > currentPage - shownBefore - 2 && idx < currentPage + shownAfter;

  useEffect(() => {
    internalHandleChange(activePage);
  }, [activePage, internalHandleChange]);

  const pageLabel = (pageNumber: number) => {
    const active = currentPage === pageNumber;
    return (
      <button
        tabIndex={-1}
        onKeyDown={keyboardHandler}
        type="button"
        role="menuitem"
        aria-current={active}
        aria-label={active ? `sida ${pageNumber}, Nuvarande sida` : `Gå till sida ${pageNumber}`}
        className={cx(`pagination-pageLabel`)}
        onClick={() => handleClick(pageNumber)}
        key={`page${pageNumber}`}
      >
        {pageNumber}
      </button>
    );
  };

  const prevNextButton: (props: {
    label: string;
    icon: JSX.Element;
    triggerNumber: number;
    step: number;
    reverse?: boolean;
    tabIndex?: number;
    index: number;
  }) => JSX.Element = ({ label, icon, triggerNumber = 1, step = 1, reverse = false, tabIndex, index }) => {
    const isDisabled = currentPage === triggerNumber;
    return (
      <button
        onKeyDown={keyboardHandler}
        tabIndex={tabIndex}
        role="menuitem"
        type="button"
        aria-label={`${label} sida`}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        data-reverse={reverse}
        onClick={() => isDisabled || handleClick(currentPage + step)}
        className={cx(`pagination-prevNextButton`)}
      >
        <span className={cx(`pagination-prevNextButton-label`)}>{hidePrevNextLabel ? '' : label}</span>
        <span className={cx(`pagination-prevNextButton-icon`)}>{icon}</span>
      </button>
    );
  };

  const ellipsis = (
    <span className={cx('pagination-prevNextButton-ellipsis')} aria-hidden={true} role="separator">
      …
    </span>
  );

  const goToNextButton = (button: HTMLElement, index: number, total: number) => {
    if (index + 1 === total) {
      goToFirstButton(button, total);
    } else {
      const next = button?.parentElement?.nextSibling?.firstChild as HTMLElement;
      if (next && next?.ariaHidden !== 'true' && next.ariaDisabled !== 'true') {
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
      if (previous && previous.ariaHidden !== 'true' && previous.ariaDisabled !== 'true') {
        previous.focus();
      } else {
        goToPreviousButton(previous, index - 1, total);
      }
    }
  };

  const goToFirstButton = (button: HTMLElement, total: number) => {
    const first = button?.parentElement?.parentElement?.firstChild?.firstChild as HTMLElement;
    if (first && first.ariaDisabled !== 'true') {
      first.focus();
    } else {
      goToNextButton(first, 0, total);
    }
  };

  const goToLastButton = (button: HTMLElement, total: number) => {
    const last = button?.parentElement?.parentElement?.lastChild?.firstChild as HTMLElement;
    if (last && last.ariaDisabled !== 'true') {
      last.focus();
    } else {
      goToPreviousButton(last, total - 1, total);
    }
  };

  const keyboardHandler = (event: KeyboardEvent<HTMLButtonElement>) => {
    const allItems = Array.from(event.currentTarget?.parentElement?.parentElement?.children as any);
    const total = allItems?.length;
    const index = allItems.indexOf(event.currentTarget?.parentElement);

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
    <nav className={cx(classes, className)} {...rest} aria-label="pagination">
      {asSelect ? (
        <Select
          size={size}
          aria-label="Gå till sida"
          value={{ label: currentPage.toString(), data: currentPage }}
          onChange={(value) => handleClick(value.data)}
        >
          {[...Array(pages)].map((_, idx: number) => (
            <Select.Option key={`selectPage-${idx}`} value={{ label: (idx + 1).toString(), data: idx + 1 }}>
              {idx + 1}
            </Select.Option>
          ))}
        </Select>
      ) : (
        <ul className="pagination-list" role="menubar" aria-orientation="horizontal">
          <li className="pagination-list-item prev-next" role="none">
            {prevNextButton({
              label: prevLabel,
              icon: <KeyboardDoubleArrowLeftOutlinedIcon aria-hidden="true" />,
              triggerNumber: minPage,
              step: -1,
              reverse: true,
              tabIndex: activePage == pages ? undefined : -1,
              index: 0,
            })}
          </li>
          {(activePage === 1 || showFirst || pagesBefore >= currentPage - 1 || pages <= shownBefore + shownAfter) && (
            <li className="pagination-list-item" role="none">
              {pageLabel(1)}
            </li>
          )}
          {currentPage > pagesBefore + 2 && showFirst && <li className="pagination-list-item ellipsis">{ellipsis}</li>}
          {[...Array(pages)].map((_, idx: number) => {
            return (
              shouldShowLabel(idx, currentPage, pagesBefore) && (
                <li key={`pageLabel-${idx}`} className="pagination-list-item" role="none">
                  {pageLabel(idx + 1)}
                </li>
              )
            );
          })}
          {currentPage < pages - pagesAfter - 1 && showLast && (
            <li className="pagination-list-item ellipsis" role="none">
              {ellipsis}
            </li>
          )}
          {(showLast ||
            activePage === pages ||
            pagesAfter > pages - (currentPage + 1) ||
            pages <= shownBefore + shownAfter) && (
            <li className="pagination-list-item" role="none">
              {pageLabel(pages)}
            </li>
          )}
          <li className="pagination-list-item  prev-next" role="none">
            {prevNextButton({
              label: nextLabel,
              icon: <KeyboardDoubleArrowRightOutlinedIcon aria-hidden="true" />,
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
