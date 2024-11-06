import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { Zoom } from '@mui/material';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: '',
    content: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: '',
      content: '',
    });
    event.preventDefault();
  }

  const [numRows, setNumRows] = useState(['1', false]);

  const handleFocus = (event) => {
    if (event.type === 'focus') {
      setNumRows(['3', true]);
    } else {
      setNumRows(['1', false]);
    }
  };

  return (
    <div>
      <form className='create-note'>
        {numRows[0] === '3' ? (
          <input
            name='title'
            onChange={handleChange}
            value={note.title}
            placeholder='Title'
          />
        ) : null}

        <textarea
          onFocus={handleFocus}
          onBlur={handleFocus}
          name='content'
          onChange={handleChange}
          value={note.content}
          placeholder='Take a note...'
          rows={numRows}
        />
        <Zoom in={numRows[1]}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
