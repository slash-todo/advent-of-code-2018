const fs = require("fs");

const input = fs
  .readFileSync(`${__dirname}/input.txt`)
  .toString()
  .trim()
  .split("\n");

const regex = /\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\] ((Guard #(\d+) (begins shift))|(falls asleep|wakes up))/;

let guardId;
const result = input.sort().map(line => {
  let [
    ,
    year,
    month,
    day,
    hour,
    minute,
    ,
    ,
    newGuardId,
    activity1,
    activity2
  ] = regex.exec(line);
  if (newGuardId) guardId = newGuardId;
  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
    hour: Number(hour),
    minute: Number(minute),
    guardId,
    activity: activity1 || activity2
  };
});

module.exports = result;
