import React, { useState } from 'react';
import ToDoItem from './ToDoItem';

function App() {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    setInputText('');
  }

  function deleteItem(id) {
    console.log(id);
    setItems((prevItems) => {
      return prevItems.filter((currVal, currIdx) => {
        return currIdx !== id;
      });
    });
  }

  const hover = {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
  };

  return (
    <div className='container'>
      <div className='heading'>
        <h1>To-Do List</h1>
      </div>
      <div className='form'>
        <input onChange={handleChange} type='text' value={inputText} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul style={hover}>
          {items.map((todoItem, idx) => (
            <ToDoItem
              key={idx}
              id={idx}
              listItem={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
