const fs = require('fs');

const input = fs
    .readFileSync(`${__dirname}/input.txt`)
    .toString()
    .trim();

module.exports = input.split(`\n`).map(str => Number(str));

// thanks to jgierer12 on github for this handy solution
