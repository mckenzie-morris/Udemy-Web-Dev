import React from 'react';
import { useState } from 'react';

function App() {
  const [headingState, setHeading] = useState('Hello');

  const clickHandler = () => {
    setHeading('Submitted');
  };

  const [colorState, setColor] = useState('white');

  const mouseIn = () => {
    setColor('black');
  };
  const mouseOut = () => {
    setColor('white');
  };

  return (
    <div className='container'>
      <h1>{headingState}</h1>
      <input type='text' placeholder="What's your name?" />
      <button
        style={{ backgroundColor: `${colorState}` }}
        onClick={clickHandler}
        onMouseEnter={mouseIn}
        onMouseOut={mouseOut}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
