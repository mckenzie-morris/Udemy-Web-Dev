//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
import React from 'react';
import ReactDOM from 'react-dom';

const newDate = new Date();
const hour = newDate.getHours();

let greeting;
let color;

if (hour >= 0 && hour < 12) {
  greeting = 'Good morning';
  color = 'red';
} else if (12 >= 0 && hour < 18) {
  greeting = 'Good afternoon';
  color = 'green';
} else if (18 >= 0 && hour <= 24) {
  greeting = 'Good evening';
  color = 'blue';
}

const styling = {
  color: `${color}`,
};

ReactDOM.render(
  <div>
    <h1 className='heading' style={styling}>
      {greeting}
    </h1>
  </div>,
  document.getElementById('root')
);
