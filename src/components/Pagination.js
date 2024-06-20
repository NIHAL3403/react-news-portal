import React from 'react';

const Pagination = ({ currentPage, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button className="btn btn-secondary" onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
      <span className="mx-2">Page {currentPage}</span>
      <button className="btn btn-secondary" onClick={handleNext}>Next</button>
    </div>
  );
};

export default Pagination;
