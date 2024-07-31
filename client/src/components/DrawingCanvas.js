import React, { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const DrawingCanvas = ({ currentPage, saveDrawing, closeDrawing }) => {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (currentPage && currentPage.drawing) {
      const img = new Image();
      img.src = currentPage.drawing;
      img.onload = () => {
        const layer = stageRef.current.children[0];
        layer.draw();
      };
    }
  }, [currentPage]);

  const handleMouseDown = () => {
    isDrawing.current = true;
    const pos = stageRef.current.getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = () => {
    if (!isDrawing.current) return;
    const stage = stageRef.current;
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    setLines(lines.slice(0, -1).concat(lastLine));
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleSave = () => {
    const stage = stageRef.current;
    saveDrawing(stage.toDataURL());
    closeDrawing();
  };

  const stageRef = useRef(null);

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation="source-over"
            />
          ))}
        </Layer>
      </Stage>
      <button onClick={handleSave} className="save-button">Save Drawing</button>
    </div>
  );
};

export default DrawingCanvas;
