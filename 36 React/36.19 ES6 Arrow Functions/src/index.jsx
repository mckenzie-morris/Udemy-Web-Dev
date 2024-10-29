import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

const numbers = [3, 56, 2, 48, 5];

////Map -Create a new array by doing something with each item in an array.
const mappedNumbers = numbers.map(x => x * 2);
console.log(mappedNumbers)

//////Filter - Create a new array by keeping the items that return true.
const filteredNumbers = numbers.filter(num => num < 10);
console.log(filteredNumbers)

//Reduce - Accumulate a value by doing something to each item in an array.
var reducedNumbers = numbers.reduce(
  (accumulator, currentNumber) => accumulator + currentNumber
);
console.log(reducedNumbers)

////Find - find the first item that matches from an array.
const foundNumber = numbers.find(num => num > 10);
console.log(foundNumber)

////FindIndex - find the index of the first item that matches.
const foundIndex = numbers.findIndex(num => num > 10)
console.log(foundIndex)

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
