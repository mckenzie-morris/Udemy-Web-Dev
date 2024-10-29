import emojipedia from './emojipedia';

var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.

function double(x) {
  return x * 2;
}

const mappedNumbers = numbers.map(double);
console.log(mappedNumbers);

//Filter - Create a new array by keeping the items that return true.

const filteredNumbers = numbers.filter((elmt) => {
  return elmt > 10;
});

console.log(filteredNumbers);

//Reduce - Accumulate a value by doing something to each item in an array.

const reducedNumbers = numbers.reduce((acc, cVal) => {
  return acc + cVal;
});

console.log(reducedNumbers);

//Find - find the first item that matches from an array.

const foundNumber = numbers.find((elmt) => {
  return elmt > 10;
});

console.log(foundNumber);

//FindIndex - find the index of the first item that matches.

const foundIndex = numbers.findIndex((idx) => {
  return idx > 10;
});

console.log(foundIndex);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser

console.log(emojipedia);

const mappedEmojis = emojipedia.map((elmt) => {
  return elmt.meaning.slice(0, 100);
});

console.log(mappedEmojis);

console.log(mappedEmojis[0].length)
