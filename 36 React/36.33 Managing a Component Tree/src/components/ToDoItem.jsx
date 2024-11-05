import React from 'react';

const ToDoItem = (props) => {
  return (
    /* Since it is necessary to pass the id of the <li /> that is clicked back 
    up to the 'App' component, it is then necessary to call the 'onChecked' with 
    the argument of the index of the clicked <li />. However, if the (onClick)
    attribute is being passed a function, it cannot be passed arguments (nor any parens
    at all) otherwise the function gets called immediately:
    
               ❌  <li onClick={props.onChecked(props.id)} >
                        {props.listItem}
                    </li> ❌

    The workaround is thus:


                    ✅ <li onClick={() => {
                            props.onChecked(props.id);
                          }}
                        >
                          {props.listItem}
                        </li> ✅

    */
    <li
      onClick={() => {
        props.onChecked(props.id);
      }}
    >
      {props.listItem}
    </li>
  );
};

export default ToDoItem;
