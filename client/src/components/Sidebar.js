import React from 'react';

function Sidebar({ pages, setCurrentPage, onNewPage, onDeletePage }) {
  return (
    <div className="sidebar">
      <h2>Pages</h2>
      <button onClick={onNewPage}>New Page</button>
      <ul>
        {pages.map(page => (
          <li key={page._id}>
            <span onClick={() => setCurrentPage(page)}>{page.title}</span>
            <button onClick={() => onDeletePage(page._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
