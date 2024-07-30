import React from 'react';

function PageCard({ page, setCurrentPage }) {
  return (
    <div className="page-card" onClick={() => setCurrentPage(page)}>
      <h3>{page.title}</h3>
      <p>{page.content.substring(0, 100)}...</p>
    </div>
  );
}

export default PageCard;
