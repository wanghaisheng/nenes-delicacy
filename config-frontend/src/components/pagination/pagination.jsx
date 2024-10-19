import classnames from 'classnames'
import {usePagination} from '../../hooks/usePagination';
import './pagination.scss'


const DOTS = '...'
const Pagination = props => {

    const {
      onPageChange,
      totalCount,
      siblingCount = 1,
      currentPage,
      pageSize,
      className
    } = props;
  
  
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  
  
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  
  
  let lastPage = paginationRange[paginationRange.length - 1];
  
  return (
    <ul className={classnames('pagination-container', { [className]: className })}
    >
       {/* Left navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
  
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li key={index} className="pagination-item dots">&#8230;</li>;
        }
  
        // Render our Page Pills
        return (
          <li
            key={index}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <div className="arrow right" />
      </li>
    </ul>
  )};
  
  export default Pagination;