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
    document.getElementById("save").innerHTML="Saving...";
    setTimeout(function(){
      document.getElementById("save").innerHTML="Save"},1000)
    
  };

  
  const toggleDrawing = () => {
    setIsDrawing(!isDrawing);
    if(isDrawing){
    document.getElementById("draw").addEventListener("click", function(){
      document.getElementById("draw").innerHTML = "Drawing...";
      
    })} else{
      document.getElementById("draw").addEventListener("click", function(){
        document.getElementById("draw").innerHTML = "Draw";
    })}
  };

  const insertCodeBlock = () => {
    const codeBlock = "\n```\nYour code here\n```\n";
    setContent(content + codeBlock);
  };

  const selectOption = (e) => {
    const selectedValue = e.target.value;
    document.getElementById("output").innerHTML = "The selected value is " + selectedValue;
    setContent(content + selectedValue + " ");
  };

  const options = [
   "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
    "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
    "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "😣", "😖",
    "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯",
    "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔",
    "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦",
    "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴",
    "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡",
    "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸",
    "😹", "😻", "😼", "😽", "🙀", "😿", "😾"
  ];

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
      {/* <button class="sharebutton">Share</button> */}
      <button onClick={handleSave} id="save">Save</button>
      <button onClick={toggleDrawing} id="draw">Draw</button>
      <button onClick={insertCodeBlock}>Insert Code Block</button>
      <button>
        EMOJIS WIP
        <select id="dropdown" onChange={selectOption}>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        <div id="output">The selected value is TEST.</div>
      </button>
      {isDrawing && <DrawingCanvas currentPage={currentPage} saveDrawing={saveDrawing} closeDrawing={toggleDrawing} />}
    </div>
  );
}

export default Editor;