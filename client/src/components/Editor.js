import React, { useState, useEffect } from 'react';

function Editor({ currentPage, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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
    </div>
  );
}

export default Editor;