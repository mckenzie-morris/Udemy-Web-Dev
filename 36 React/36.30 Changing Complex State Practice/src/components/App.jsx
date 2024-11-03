import React, { useState } from 'react';

function App() {
  const [contact, setContact] = useState({
    fName: '',
    lName: '',
    email: '',
  });

  const updateContact = (event) => {
    const { name, value } = event.target;

    setContact((prevState) => {
      if (name === 'fName') {
        return { fName: value, lName: prevState.lName, email: prevState.email };
      } else if (name === 'lName') {
        return { fName: prevState.fName, lName: value, email: prevState.email };
      } else {
        return { fName: prevState.fName, lName: prevState.lName, email: value };
      }
    });
  };

  return (
    <div className='container'>
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input
          onChange={updateContact}
          value={contact.fName}
          name='fName'
          placeholder='First Name'
        />
        <input
          onChange={updateContact}
          value={contact.lName}
          name='lName'
          placeholder='Last Name'
        />
        <input
          onChange={updateContact}
          value={contact.email}
          name='email'
          placeholder='Email'
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
