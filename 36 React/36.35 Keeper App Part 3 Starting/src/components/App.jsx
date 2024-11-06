import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';
import { useState } from 'react';

function App() {
  const [notesArr, setNotesArr] = useState([]);

  const handleClick = (newNote) => {
    setNotesArr((prevState) => {
      return [...prevState, newNote];
    });
  };

  const handleDelete = (id) => {
    setNotesArr((prevState) => {
      return prevState.filter((cVal, idx) => {
        return idx !== id;
      });
    });
  };

  return (
    <div>
      <Header />
      <CreateArea clickFunc={handleClick} />
      {notesArr.map((elmt, idx) => {
        return (
          <Note
            key={idx}
            id={idx}
            deleteFunc={handleDelete}
            title={elmt.title}
            content={elmt.content}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
