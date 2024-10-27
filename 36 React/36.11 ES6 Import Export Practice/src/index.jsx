import React from 'react';
import ReactDOM from 'react-dom';
import * as calcFunctions from './calculator';

/* using object destructuring, the below result could be achieved in one line:

import { add, multiply, subtract, divide } from './calculator';

or, keeping the above line the same (using the '*' wildcard):

const { add, multiply, subtract, divide } = calcFunctions;

*/

const add = calcFunctions.add;
const multiply = calcFunctions.multiply;
const subtract = calcFunctions.subtract;
const divide = calcFunctions.divide;

// console.log(calcFunctions)

//Import the add, multiply, subtract and divide functions
//from the calculator.js file.
//If successful, your website should look the same as the Final.png

ReactDOM.render(
  <ul>
    <li>{add(1, 2)}</li>
    <li>{multiply(2, 3)}</li>
    <li>{subtract(7, 2)}</li>
    <li>{divide(5, 2)}</li>
  </ul>,
  document.getElementById('root')
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
