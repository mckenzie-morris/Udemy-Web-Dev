import React, { useState } from 'react';

function CreateArea(props) {
  const [note, setNote] = useState({ title: '', content: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNote((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div>
      <form>
        <input
          name='title'
          onChange={handleChange}
          value={note.title}
          placeholder='Title'
        />
        <textarea
          onChange={handleChange}
          name='content'
          value={note.content}
          placeholder='Take a note...'
          rows='3'
        />
        <button
          /* when the below call to:
        
        setNote({ title: '', content: '' }) 
        
        is made, it schedules a state update, but this update doesn't immediately 
        reflect within the current synchronous function call. instead, React batches 
        and applies state updates after the current event loop tick finishes. hence why:

        props.clickFunc(note);

        can be called after the above function call, but still transmit the correct state.
        
        state updates are asynchronous, allowing functions to access the current 
        state even after calling a state update function.*/
          onClick={() => {
            setNote({ title: '', content: '' });
            props.clickFunc(note);
          }}
          type='button'
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
