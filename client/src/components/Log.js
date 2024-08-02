import React from 'react';

const Log = ({ logs }) => {
  return (
    <div className="log">
      <h2>Logs</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

export default Log;
