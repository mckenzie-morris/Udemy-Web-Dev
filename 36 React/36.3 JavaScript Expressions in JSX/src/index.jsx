// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
import React from 'react';
import ReactDOM from 'react-dom';

const fName = 'Mckenzie';
const lName = 'Morris';
const luckyNumber = 13;

ReactDOM.render(
  <div>
    <h1>
      Hello {fName} {lName}!
    </h1>
    <p>Your lucky number is {luckyNumber}</p>
  </div>,
  document.getElementById('root')
);
