import React, { useState } from 'react';

function Sidebar({ pages, setCurrentPage, onNewPage, onDeletePage }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sidebar">
      <h2>Pages</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <button onClick={onNewPage}>New Page</button>
      <ul>
        {filteredPages.map(page => (
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
