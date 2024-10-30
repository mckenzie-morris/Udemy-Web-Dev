import React, { useState } from 'react';

function App() {
  const [time, setTime] = useState(new Date().toLocaleTimeString().split(' ')[0]);

  console.log(time);

  const updateTime = () => {
    return setTime(new Date().toLocaleTimeString().split(' ')[0]);
  };

  setInterval(updateTime, 1000)

  return (
    <div className='container'>
      <h1>{time}</h1>
      <button >Get Time</button>
    </div>
  );

  
}

export default App;
