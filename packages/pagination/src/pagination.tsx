import { colors, DefaultProps } from "@sk-web-gui/theme";
import { cx, __DEV__ } from "@sk-web-gui/utils";
import React, { useEffect, useState } from 'react';

import { usePaginationClass } from "./styles";

export interface IPaginationProps extends DefaultProps {
  /* Total amount of pages */
  pages: number;
  /* Handles page number change */
  handleChange: (page: number) => void;
  /* Size of the button */
  size?: "sm" | "md" | "lg";
}

export interface PaginationProps
  extends React.HTMLAttributes<HTMLDivElement>,
  IPaginationProps {}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (props, ref) => {
    const {
      pages = 1,
      handleChange,
      children,
      size = "md",
      ...rest
    } = props;

    const classes = usePaginationClass({
      size,
    });

    const minPage = 1;
    const pagesBeforeAndAfter = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const internalHandleChange = (page: number) => {
      console.log('handling page', page);
      if (page > minPage - 1 && page < pages + 1) {
        setCurrentPage(page);
      }
    };

    const shouldShowLabel: (idx: number, cP: number, pBaA: number) => boolean = (idx) =>
      idx !== 0 &&
      idx !== pages - 1 &&
      idx > currentPage - pagesBeforeAndAfter - 2 &&
      idx < currentPage + pagesBeforeAndAfter;

    useEffect(() => {
      handleChange(currentPage);
    }, [currentPage, handleChange]);

    const pageLabel = (pageNumber: number) => {
      const isDisabled = currentPage === pageNumber;
      return (
        <button
          type="button"
          tabIndex={0}
          aria-current={currentPage === pageNumber}
          aria-disabled={isDisabled}
          aria-label={(currentPage === pageNumber) ? `sida ${pageNumber}, Nuvarande sida` : `Gå till sida ${pageNumber}`}
          className={cx(`pagination-pageLabel`)}
          onClick={() => internalHandleChange(pageNumber)}
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
          tabIndex={0}
          aria-label={`${label} sida`}
          aria-disabled={isDisabled}
          disabled={isDisabled}
          data-reverse={reverse}
          onClick={() => isDisabled || internalHandleChange(currentPage + step)}
          className={cx(
            `pagination-prevNextButton`
          )}
        >
          <span className={cx(`pagination-prevNextButton-label`)}>
            {label}
          </span>
          <span className={cx(`pagination-prevNextButton-icon`)}>{icon}</span>
        </button>
      );
    };

    const ellipsis = <span className="pagination-prevNextButton-ellipsis">...</span>;

    return (
      <nav className={cx(classes)} {...rest} aria-label="pagination">
        <ul className="pagination-list">
          <li className="inline">
            {prevNextButton({
              label: 'Föregående',
              icon: 
              <span
                className="material-icons-outlined"
                aria-hidden="true"
              >
                keyboard_double_arrow_left
              </span>,
              triggerNumber: minPage,
              step: -1,
              reverse: true,
            })}
          </li>
          <li className="inline">{pageLabel(1)}</li>
          {currentPage > pagesBeforeAndAfter + 2 && <li className="inline">{ellipsis}</li>}
          {[...Array(pages)].map((_, idx: number) => {
            return (
              shouldShowLabel(idx, currentPage, pagesBeforeAndAfter) && (
                <li key={`pageLabel-${idx}`} className="inline">
                  {pageLabel(idx + 1)}
                </li>
              )
            );
          })}
          {currentPage < pages - pagesBeforeAndAfter - 1 && <li className="inline">{ellipsis}</li>}
          <li className="inline">{pageLabel(pages)}</li>
          <li className="inline">
            {prevNextButton({
              label: 'Nästa',
              icon: 
              <span
                className="material-icons-outlined"
                aria-hidden="true"
              >
                keyboard_double_arrow_right
              </span>,
              triggerNumber: pages, step: 1 })}
          </li>
        </ul>
      </nav>
    );
  }
);

if (__DEV__) {
  Pagination.displayName = "Pagination";
}