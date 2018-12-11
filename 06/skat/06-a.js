console.clear();
const locations = require('./input.js');
const Field = require('./field.js');

const field = new Field(locations);

field.getLargestArea();
debugger;
// locations.forEach(cord => console.log(cord));
