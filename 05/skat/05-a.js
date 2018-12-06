console.clear();
const polymer = require('./input.js');

const generateReagents = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const reagents = [];
    alphabet.forEach(letter => {
        const a = letter + letter.toUpperCase();
        const b = letter.toUpperCase() + letter;
        reagents.push(a, b);
    });
    return reagents.map(reagent => new RegExp(reagent, 'g'));
};

const reagents = generateReagents();

const react = (polymer, reagents) => {
    let volatile = true;
    let lastLength = polymer.length;
    while (volatile) {
        reagents.forEach(regex => {
            polymer = polymer.replace(regex, '');
        });
        // if polymer length is the same, reactions are finished
        volatile = polymer.length === lastLength ? false : true;
        lastLength = polymer.length;
    }
    return polymer;
};

let reactedPolymer = react(polymer, reagents);
console.log(reactedPolymer.length);
