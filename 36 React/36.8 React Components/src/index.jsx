import React from 'react';
import ReactDOM from 'react-dom';
import Heading from './Heading';
import List from './List';

/* React convention to use PascalCase in constructing components

function Heading() {
  return <h1>My favorite foods</h1>;
}

*/

ReactDOM.render(
  <div>
    <Heading></Heading>
    {/* Best practice to turn custom components into self-closing tags (if nothing
    is being rendered between tags in the file) */}
    <List />
  </div>,
  document.getElementById('root')
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
