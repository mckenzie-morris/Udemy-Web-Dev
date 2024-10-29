import React from 'react';
import Entry from './Entry';
import emojipedia from '../emojipedia';

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className='dictionary'>
        {emojipedia.map((cVal) => {
          return (
            <Entry
              key={cVal.id}
              emoji={cVal.emoji}
              name={cVal.name}
              meaning={cVal.meaning}
            />
          );
        })}
      </dl>
    </div>
  );
}

export default App;
