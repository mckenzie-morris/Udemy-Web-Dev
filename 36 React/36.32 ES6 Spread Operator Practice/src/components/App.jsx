import React, { useState } from 'react';

function App() {
  const [inputState, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
    return inputState;
  };

  const [listState, setList] = useState([]);

  const handleClick = (event) => {
    setList((prevState) => {
      return [...prevState, inputState];
    });
    return setInput('');
  };

  console.log(listState);

  return (
    <div className='container'>
      <div className='heading'>
        <h1>To-Do List</h1>
      </div>
      <div className='form'>
        <input
          id='userInput'
          onChange={handleChange}
          value={inputState}
          type='text'
        />
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {listState.map((elmt, idx) => {
            return <li key={idx}>{elmt}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
