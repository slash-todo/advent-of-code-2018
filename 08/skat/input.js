const fs = require('fs');

const input = fs.readFileSync(`${__dirname}/input.txt`).toString();

module.exports = input.split(` `).map(string => Number(string));

// thanks to jgierer12 on github for this handy solution
