import React from "react";

class ClassComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
    /* this.increase = this.increase.bind(this);

    lefthand-side 'this': refers to the instance of ClassComponent that’s being 
    created by the new keyword

    righthand-side (first) 'this': refers to the original increase method defined 
    in the class, which, before binding, is an unbound function. it doesn’t yet 
    know which 'this' context it should use.

    righthand-side (second) 'this': refers to the component instance, binding the 
    method to the instance so that 'this' in 'increase' will always point to 
    ClassComponent */
    this.increase = this.increase.bind(this);
  }

  increase() {
    // context: 'this' = ClassComponent
    console.log(this)
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        {/* React calls this.increase as a callback; this.increase refers 
        to the increase() method in the component’s instance */}
        <button onClick={this.increase}>+</button>
      </div>
    );
  }
}

export default ClassComponent;
