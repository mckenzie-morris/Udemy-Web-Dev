import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

//Step 1: Run the solution.js file without looking at the code.
//Step 2: You can go to the recipe.json file to see the full structure of the recipeJSON below.
const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// initialize resData as undefined so that conditional statement in 'index.ejs' is not triggered
let resData = undefined;

app.get('/', (req, res) => {
  return res.status(200).render('index.ejs', { resData });
});

app.post('/recipe', (req, res) => {
  let keyFound = false;
  // recursive function goes thru each key/object in elmt (obj)
  const recursiveFunc = (obj) => {
    for (let key in obj) {
      /* if selected ingredient ("Chicken", "Beef", or "Fish") flip value of 'keyFound' and 
      return it.
      else if the value at the given key is an object, recursively call the function on
      that object. */
      if (obj[key] == req.body.choice) {
        return (keyFound = true);
      } else if (typeof obj[key] === 'object') {
        recursiveFunc(obj[key]);
      }
    }
  };
  // iterate thru (parsed) 'recipeJSON'
  for (let elmt of JSON.parse(recipeJSON)) {
    // call recursive function on elmt
    recursiveFunc(elmt);
    /* if the key corresponding to the clicked ingredient is found in the function above,
    'keyFound' will be set to true.
    if 'keyfound' is true, stringify the corresponding elmt in 'recipeJSON' and reassign
    'resData' to elmt, then redirect to root route */
    if (keyFound === true) {
      resData = elmt;
      return res.redirect('/');
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
