import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    // Check if the new page number is within valid bounds
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage); // Call the function to update the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Corrected typo
      });
    }
  }
  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
