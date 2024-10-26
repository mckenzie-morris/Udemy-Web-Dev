const pi = 3.1415962;

function doublePi() {
  return pi * 2;
}

function triplePi() {
  return pi * 3;
}

/* default export means that however it's called in the import statement in the file
('pie', 'whatevs', etc.) importing the export, it will still be, in this instance, 'pi' */
export default pi;

/* in order to import named exports (such as below), they must be specifically named in
the import statement */
export {doublePi, triplePi}