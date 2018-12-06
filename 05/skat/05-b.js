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

const removeReagentAndReact = (polymer, reagents) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const regexSet = alphabet.map(letter => {
        const a = new RegExp(letter, 'g');
        const b = new RegExp(letter.toUpperCase(), 'g');
        return [a, b];
    });
    let min = polymer.length;
    regexSet.forEach(regex => {
        let clone = polymer;
        clone = clone.replace(regex[0], '');
        clone = clone.replace(regex[1], '');
        clone = react(clone, reagents);
        min = min < clone.length ? min : clone.length;
    });
    return min;
};

console.log(removeReagentAndReact(polymer, reagents));
