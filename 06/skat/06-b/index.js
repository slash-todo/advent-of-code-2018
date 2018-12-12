console.clear();
const startTime = Date.now();

const Field = require('../field.js');
const locations = require('../input.js');
// let locations = ['1, 1', '1, 6', '8, 3', '3, 4', '5, 5', '8, 9'];

const field = new Field(locations);
console.log(field.sumDistanceToAllPoints(10000));

const visualizeGrid = () => {
    let string = '';
    field.grid.forEach((cell, index) => {
        let entry = '';

        // print the entry
        if (typeof cell === 'object' && !!cell) {
            entry = String(cell.id).padStart(2, '░');
        } else if (cell === 'multiple') {
            entry = '++';
        } else if (typeof cell === 'object' && !cell) {
            // null
            entry = '..';
        } else {
            entry = cell.toString().padStart(2, '0');
        }

        string = string + entry + ' ';

        if ((index + 1) % field.width === 0) {
            string = string + '\n';
        }
    });
    console.log('\n' + string);
    // debugger;
};

// visualizeGrid();
