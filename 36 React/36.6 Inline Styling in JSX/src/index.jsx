import React from 'react';
import ReactDOM from 'react-dom';

const customStyle = {
  display: 'flex',
  justifyContent: 'center',
  fontSize: '10rem',
};

/* 

The same custom class, but in *proper* CSS formatting 
(note: React requires camelCase, CSS requires kebab-case)

.customStyle {
  display: flex;
  justify-content: center;
  font-size: 10rem;
} 

*/

ReactDOM.render(
  <h1 style={customStyle}>
    Hello World!
  </h1>,
  document.getElementById('root')
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
