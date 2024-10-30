import React, { useState } from 'react';

function App() {
  /* calling the useState function with an initial value ('0' in this case) will
  initialize state with that value as the first value in the following array:
  [state, f () = setState]
  
  The destructuring example below works as follows: the first value in the destructured
  array represents the specified argument in the useState function ('0') and the second
  value represents the function to update the state. */
  let [count, setCount] = useState(0);
  console.log(count);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  return (
    <div className='container'>
      <h1>{count}</h1>
      {/* The buttons below must be passed function references, as oppossed to directly
      calling the update state function ( 'setCount(count +/- 1)' ) directly, because, 
      since the function setCount is being passed arguments, it would be immediately 
      invoked upon the initial render, therefore it tries to update the state immediately- 
      leading to errors */}
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

export default App;
