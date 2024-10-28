import React from 'react';
import ReactDOM from 'react-dom';

function Card(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <img src={props.img} alt='avatar_img' />
      <p>{props.tel}</p>
      <p>{props.email}</p>
    </div>
  );
}

ReactDOM.render(
  <div>
    <h1>My Contacts</h1>
    <Card
      name='Beyonce'
      img='https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg'
      tel='+123 456 789'
      email='b@beyonce.com'
    />
    <Card
      name='Chuck'
      img='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGEI-KhPHFFfEPKMIuU2jbiWsj7Y4XhbRzWd1gGxc7xnzuqOeZZ2PomJ9VBTnVfgsFSq8&usqp=CAU'
      tel='+123 456 789'
      email='ChuckyN@Norris.com'
    />
  </div>,
  document.getElementById('root')
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
