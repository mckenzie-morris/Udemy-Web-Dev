import React from 'react';
import Card from './Card';
import contacts from '../contacts';

function App() {
  return (
    <div>
      <h1 className='heading'>My Contacts</h1>
      {contacts.map((cVal) => {
        return (
          <Card
            /* In order to prevent the following warning (from React) in the browser:

            'Warning: Each child in a list should have a unique "key" prop.'

             attach the below 'key' property, and ensure it has a unique value. React
             treats the prop specifically called 'key' as a special prop that will
             not be passed down thru the virtual DOM to any of the component's children       
          */
            key={cVal.id}
            /* the below prop ('id') will be passed down thru the virtual DOM to 
            child components */
            id={cVal.id}
            name={cVal.name}
            img={cVal.imgURL}
            tel={cVal.phone}
            email={cVal.email}
          />
        );
      })}
      {/* <Card
        name={contacts[0].name}
        img={contacts[0].imgURL}
        tel={contacts[0].phone}
        email={contacts[0].email}
      />
      <Card
        name={contacts[1].name}
        img={contacts[1].imgURL}
        tel={contacts[1].phone}
        email={contacts[1].email}
      />
      <Card
        name={contacts[2].name}
        img={contacts[2].imgURL}
        tel={contacts[2].phone}
        email={contacts[2].email}
      /> */}
    </div>
  );
}

export default App;
