import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
    return;
  };

  const [submission, setSubmission] = useState('');

  const handleSubmit = (event) => {
    return setSubmission(name);
  };

  return (
    <div className='container'>
      <h1>Hello {submission}</h1>
      {/* note: the <input /> and <button /> elements are NOT wrapped in a <form />-
      doing so would cause a page refresh on the button click (the form element's
      built-in 'onsubmit' attribute/method), which would extrude the JavaScript
      expression from the HTML element immediately following the page refresh */}
      <input
        onChange={handleChange}
        type='text'
        placeholder="What's your name?"
        /* note: best practice dictates adding the HTML value attribute and setting it
        to the React state that corresponds to how that value is being tracked, in 
        order to prevent any possible conflicts */
        value={name}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
