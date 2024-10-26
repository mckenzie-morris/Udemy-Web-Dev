import React from 'react';
import ReactDOM from 'react-dom';
/* 
'pi' could be called anything ('pie', 'whatevs', etc.) since the default export
in the file ('math.js') is the constant 'pi'. however, the non-default imports
('{doublePi, triplePi}') must be referenced specifically

The import statement below:
import * as allTheExports from './math';

is equally valid, and 'allTheExports' would be an object with the exports and 
their definitions as key-value pairs
*/
import pi, { doublePi, triplePi } from './math';

ReactDOM.render(
  <ul>
    <li>{pi}</li>
    {/* note: the below are functions, and in order to return their respective values,
    must include parentheses to produce the evaluated result of those function */}
    <li>{doublePi()}</li>
    <li>{triplePi()}</li>
  </ul>,
  document.getElementById('root')
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
