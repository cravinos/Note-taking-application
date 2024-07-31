import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import PageCard from './components/PageCard';
import './App.css';

function App() {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/pages');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPages(data);
    } catch (error) {
      console.error("Could not fetch pages:", error);
    }
  };

  const handleNewPage = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'Untitled', content: '' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newPage = await response.json();
      setPages([...pages, newPage]);
      setCurrentPage(newPage);
    } catch (error) {
      console.error("Could not create new page:", error);
    }
  };

  const handleSavePage = async (updatedPage) => {
    try {
      const response = await fetch(`http://localhost:5001/api/pages/${updatedPage._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPage),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedPage = await response.json();
      setPages(pages.map(p => p._id === savedPage._id ? savedPage : p));
      setCurrentPage(savedPage);
    } catch (error) {
      console.error("Could not save page:", error);
    }
  };

  const handleDeletePage = async (pageId) => {
    console.log("Deleting page with ID:", pageId); // Debug line
    try {
      const response = await fetch(`http://localhost:5001/api/pages/${pageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setPages(pages.filter(page => page._id !== pageId));
      if (currentPage && currentPage._id === pageId) {
        setCurrentPage(null);
      }
    } catch (error) {
      console.error("Could not delete page:", error);
    }
  };

  const saveDrawing = async (drawingDataUrl) => {
    if (currentPage) {
      const updatedPage = { ...currentPage, drawing: drawingDataUrl };
      handleSavePage(updatedPage);
    }
  };

  return (
    <div className="App">
      <Sidebar
        pages={pages}
        setCurrentPage={setCurrentPage}
        onNewPage={handleNewPage}
        onDeletePage={handleDeletePage}
      />
      {currentPage ? (
        <Editor currentPage={currentPage} onSave={handleSavePage} saveDrawing={saveDrawing} />
      ) : (
        <div className="page-cards-container">
          {pages.map(page => (
            <PageCard key={page._id} page={page} setCurrentPage={setCurrentPage} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
