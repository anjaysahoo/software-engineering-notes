import { useMemo } from 'react';

const Pagination = ({
  totalItems,
  itemsPerPage = 10,
  currentPage = 1,
  onChange,
  siblingCount = 1,
}) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers array with dots
  const getPageNumbers = useMemo(() => {
    const range = (start, end) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, idx) => idx + start);
    };

    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      return [...range(1, leftItemCount), '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      return [1, '...', ...range(totalPages - rightItemCount + 1, totalPages)];
    }

    return [
      1,
      '...',
      ...range(leftSiblingIndex, rightSiblingIndex),
      '...',
      totalPages,
    ];
  }, [totalPages, currentPage, siblingCount]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onChange(page);
    }
  };

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button
        className="pagination__button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ←
      </button>
      
      {getPageNumbers.map((pageNumber, index) => (
        <button
          key={index}
          className={`pagination__button ${
            pageNumber === currentPage ? 'pagination__button--active' : ''
          } ${pageNumber === '...' ? 'pagination__button--dots' : ''}`}
          onClick={() => pageNumber !== '...' && handlePageChange(pageNumber)}
          disabled={pageNumber === '...'}
          aria-current={pageNumber === currentPage ? 'page' : undefined}
          aria-label={pageNumber === '...' ? 'More pages' : `Page ${pageNumber}`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className="pagination__button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
};

export default Pagination; 