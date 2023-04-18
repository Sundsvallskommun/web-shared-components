import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { DefaultProps } from '@sk-web-gui/theme';
import { __DEV__, cx } from '@sk-web-gui/utils';
import React, { useEffect, useState } from 'react';
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
    const isDisabled = currentPage === pageNumber;
    return (
      <button
        type="button"
        aria-current={currentPage === pageNumber}
        aria-disabled={isDisabled}
        aria-label={currentPage === pageNumber ? `sida ${pageNumber}, Nuvarande sida` : `Gå till sida ${pageNumber}`}
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
  }) => JSX.Element = ({ label, icon, triggerNumber = 1, step = 1, reverse = false }) => {
    const isDisabled = currentPage === triggerNumber;
    return (
      <button
        type="button"
        aria-label={`${label} sida`}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        data-reverse={reverse}
        onClick={() => isDisabled || handleClick(currentPage + step)}
        className={cx(`pagination-prevNextButton`)}
      >
        <span className={cx(`pagination-prevNextButton-label`)}>{label || ' '}</span>
        <span className={cx(`pagination-prevNextButton-icon`)}>{icon}</span>
      </button>
    );
  };

  const ellipsis = <span className={cx('pagination-prevNextButton-ellipsis')}>…</span>;

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
        <ul className="pagination-list">
          <li className="inline">
            {prevNextButton({
              label: prevLabel,
              icon: <KeyboardDoubleArrowLeftOutlinedIcon aria-hidden="true" />,
              triggerNumber: minPage,
              step: -1,
              reverse: true,
            })}
          </li>
          {(activePage === 1 || showFirst || pagesBefore >= currentPage - 1) && (
            <li className="inline-flex">{pageLabel(1)}</li>
          )}
          {currentPage > pagesBefore + 2 && showFirst && <li className="inline">{ellipsis}</li>}
          {[...Array(pages)].map((_, idx: number) => {
            return (
              shouldShowLabel(idx, currentPage, pagesBefore) && (
                <li key={`pageLabel-${idx}`} className="inline">
                  {pageLabel(idx + 1)}
                </li>
              )
            );
          })}
          {currentPage < pages - pagesAfter - 1 && showLast && <li className="inline">{ellipsis}</li>}
          {(showLast || activePage === pages || pagesAfter > pages - (currentPage + 1)) && (
            <li className="inline">{pageLabel(pages)}</li>
          )}
          <li className="inline">
            {prevNextButton({
              label: nextLabel,
              icon: <KeyboardDoubleArrowRightOutlinedIcon aria-hidden="true" />,
              triggerNumber: pages,
              step: 1,
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
