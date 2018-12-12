console.clear();
const Field = require('./field.js');
const locations = require('../input.js');
// let locations = ['1, 1', '1, 6', '8, 3', '3, 4', '5, 5', '8, 9'];

const field = new Field(locations);
console.log(field.getLargestArea());

const visualizeGrid = () => {
    let string = '';
    field.grid.forEach((cell, index) => {
        let entry = '';

        // print the entry
        if (typeof cell === 'object') {
            entry = String(cell.id).padStart(2, '░');
        } else if (cell === 'multiple') {
            entry = '++';
        } else {
            entry = cell.toString().padStart(2, '0');
        }

        string = string + entry + ' ';

        if ((index + 1) % field.width === 0) {
            string = string + '\n';
        }
    });
    console.log(string);
    debugger;
};

// visualizeGrid();

// debugger;
