const fs = require("fs");

module.exports = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split("");
