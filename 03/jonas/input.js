const fs = require("fs");

const input = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split("\n");

const regex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;

module.exports = input.map(line => {
  const [, id, left, top, width, height] = regex
    .exec(line)
    .map(str => Number(str));
  return {
    id,
    left, // inclusive
    right: left + width, // exclusive
    top, // inclusive
    bottom: top + height // exclusive
  };
});
