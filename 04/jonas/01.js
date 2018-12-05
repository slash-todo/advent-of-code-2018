const notes = require("./input").filter(
  note => note.activity !== "begins shift"
);

let minutes = {};
let sleepStart = 0;
notes.forEach(note => {
  if (note.activity === "falls asleep") {
    sleepStart = note.minute;
    return;
  }

  for (let i = sleepStart; i < note.minute; i++) {
    if (!minutes[note.guardId]) minutes[note.guardId] = {};
    minutes[note.guardId][i] = (minutes[note.guardId][i] || 0) + 1;
  }

  sleepStart = 0;
});

const totalMinutes = Object.entries(minutes).reduce(
  (acc, [guardId, guardMinutes]) => {
    acc[guardId] = Object.values(guardMinutes).reduce(
      (totalCount, count) => totalCount + count,
      0
    );
    return acc;
  },
  {}
);

const largestMinute = arr =>
  Object.entries(arr).sort(([, a], [, b]) => b - a)[0][0];

const mostFrequentMinute = guardId => largestMinute(minutes[guardId]);
const guardId = largestMinute(totalMinutes);
console.log(guardId * mostFrequentMinute(guardId));
