const fs = require('fs');

const input = fs.readFileSync(`${__dirname}/input.txt`).toString();

module.exports = input.split(`\n`);

// thanks to jgierer12 on github for this handy solution
