// CHALLENGE: uncomment the code below and see the car stats rendered ✅
import React from 'react';
import ReactDOM from 'react-dom';
import cars from './practice';
import animals from './data';

////////////////////  Added code ////////////////////

/* note: when destructuring arrays, naming is arbitrary. If destructuring objects,
however, the name must match the key the declaration is based on.

  i.e. console.log(cat) // ---> {name: 'cat', sound: 'meow'} 
       const {name, sound} = cat;

  If it's necessary to assign a name other than the key, the given key must be included
  as a key in the destructured object, and the name the corresponding value

  i.e. const [honda, tesla] = cars;
       console.log(honda) // ---> {model: 'Honda Civic', coloursByPopularity: ['black', 'silver'], speedStats: {topSpeed: 140, zeroToSixty: 8.5}}
       const { topSpeed: hondaTopSpeed } = honda.speedStats;

*/
const [cat, dog] = animals;
console.log(cat, dog);
const { name, sound } = cat;
console.log(name, sound);

const [honda, tesla] = cars;
const { topSpeed: teslaTopSpeed } = tesla.speedStats;
// alternative: const {speedStats: {topSpeed: teslaTopSpeed}} = tesla
const { topSpeed: hondaTopSpeed } = honda.speedStats;
const [hondaTopColour] = honda.coloursByPopularity;
// alternative: const {coloursByPopularity: [hondaTopColour]} = honda
const [teslaTopColour] = tesla.coloursByPopularity;
console.log(honda, tesla);
console.log(teslaTopSpeed, hondaTopSpeed);
console.log(teslaTopColour, hondaTopColour);
/////////////////////////////////////////////////////

ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>,
  document.getElementById('root')
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
