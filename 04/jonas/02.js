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

const highestMinutes = {};
for (const guardId in minutes) {
  highestMinutes[guardId] = Object.entries(minutes[guardId]).sort(
    ([, a], [, b]) => b - a
  )[0];
}

const [guardId, [minute]] = Object.entries(highestMinutes).sort(
  ([, a], [, b]) => b[1] - a[1]
)[0];

console.log(guardId * minute);
