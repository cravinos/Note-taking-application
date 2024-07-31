import React, { useState, useEffect } from 'react';
import DrawingCanvas from './DrawingCanvas';

function Editor({ currentPage, onSave, saveDrawing }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (currentPage) {
      setTitle(currentPage.title);
      setContent(currentPage.content);
    }
  }, [currentPage]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    onSave({ ...currentPage, title, content });
  };

  const toggleDrawing = () => {
    setIsDrawing(!isDrawing);
  };

  const insertCodeBlock = () => {
    const codeBlock = "\n```\nYour code here\n```\n";
    setContent(content + codeBlock);
  };

  if (!currentPage) return <div>Select a page to edit</div>;

  return (
    <div className="editor">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Page Title"
        className="title-input"
      />
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Start typing..."
        className="content-textarea"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={toggleDrawing}>Draw</button>
      <button onClick={insertCodeBlock}>Insert Code Block</button>
      {isDrawing && <DrawingCanvas currentPage={currentPage} saveDrawing={saveDrawing} closeDrawing={toggleDrawing} />}
    </div>
  );
}

export default Editor;
