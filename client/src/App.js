import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import PageCard from './components/PageCard';
import Log from './components/Log';
import Register from './components/Register';
import Login from './components/Login';
import Popup from './components/Popup';
import './App.css';

function App() {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [logs, setLogs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchPages();
      fetchUser();
      setShowPopup(true); 
    }
  }, [token]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const fetchPages = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/pages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPages(data);
      addLog('Fetched pages successfully.');
    } catch (error) {
      console.error("Could not fetch pages:", error);
      addLog('Error fetching pages.');
    }
  };

const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Could not fetch user:", error);
    }
  };

  const handleNewPage = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: 'Untitled', content: '' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newPage = await response.json();
      setPages([...pages, newPage]);
      setCurrentPage(newPage);
      addLog('Created a new page.');
    } catch (error) {
      console.error("Could not create new page:", error);
      addLog('Error creating a new page.');
    }
  };

  const handleSavePage = async (updatedPage) => {
    try {
      const response = await fetch(`http://localhost:5001/api/pages/${updatedPage._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedPage),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedPage = await response.json();
      setPages(pages.map(p => p._id === savedPage._id ? savedPage : p));
      setCurrentPage(savedPage);
      addLog('Saved the page.');
    } catch (error) {
      console.error("Could not save page:", error);
      addLog('Error saving the page.');
    }
  };



  const handleDeletePage = async (pageId) => {
    console.log("Deleting page with ID:", pageId); // Debug line
    try {
      const response = await fetch(`http://localhost:5001/api/pages/${pageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setPages(pages.filter(page => page._id !== pageId));
      if (currentPage && currentPage._id === pageId) {
        setCurrentPage(null);
      }
      addLog('Deleted the page.');
    } catch (error) {
      console.error("Could not delete page:", error);
      addLog('Error deleting the page.');
    }
  };

  const saveDrawing = async (drawingDataUrl) => {
    if (currentPage) {
      const updatedPage = { ...currentPage, drawing: drawingDataUrl };
      handleSavePage(updatedPage);
      addLog('Saved the drawing.');
    }
  };

  const addLog = (message) => {
    setLogs([...logs, message]);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const closePopup = () => {
    setShowPopup(false); 
  };

  if (!token) {
    return (
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} setUser={setUser}/>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="App">
      {/* <button onClick={() => setDarkMode(!darkMode)} className="toggle-theme-button">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button> */}
      <Routes>
        <Route path="/" element={
          <>
            <Sidebar
            user={user}
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
            <Log logs={logs} />
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        } />
<Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <Popup show={showPopup} handleClose={closePopup} content={<div>Items that are WIP: <br/>
          1) Literally everything lol<br/>
          2) but actually the sharing isnt done yet<br/>
          3) neither is the logs to show who is logged in <br/>
          4) I do want to add live coding to people can edit<br/>
          4a) live coding was actually the first goal of this... had to scrap it 😔


      </div>} /> */}

    </div>
  );
}

export default App;
