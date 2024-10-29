import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import notes from '../notes';

function App() {
  return (
    <div>
      <Header />
      {notes.map((elmt) => (
        <Note key={elmt.key} title={elmt.title} content={elmt.content} />
      ))}
      <Footer />
    </div>
  );
}

export default App;
