//Create a react app from scratch.
//It should display 2 paragraph HTML elements.
//The paragraphs should say:
//Created by YOURNAME.
//Copyright CURRENTYEAR.
//E.g.
//Created by Angela Yu.
//Copyright 2019.

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
import React from 'react';
import ReactDOM from 'react-dom';

const fName = 'Mckenzie';
const lName = 'Morris';
const date = new Date();
const currentYear = date.getFullYear();


ReactDOM.render(
  <div>
    <h1>Created by {`${fName} ${lName}`}</h1>
    <h2>Copyright: {currentYear}</h2>
  </div>,
  document.getElementById('root')
);
