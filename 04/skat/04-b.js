console.clear();
const logs = require('./input.js');

// sort into chrono
logs.sort();

// split logs into per guard logs
const splitLogs = logs => {
    let guardLogs = [];
    let tempArray = [];
    let firstLogFlag = false;
    logs.forEach(log => {
        // find a # sign
        // special case for first log
        if (!firstLogFlag) {
            tempArray.push(log);
            firstLogFlag = true;
        } else {
            // Main Logic
            if (log.split('#').length === 2) {
                guardLogs.push(tempArray);
                tempArray = [log];
            } else {
                tempArray.push(log);
            }
        }
    });
    return guardLogs;
};

const guardHistory = splitLogs(logs);

// Sample Data
// [1518-02-12 23:50] Guard #1789 begins shift
// [1518-02-13 00:05] falls asleep
// [1518-02-13 00:25] wakes up
// [1518-02-13 00:40] falls asleep
// [1518-02-13 00:52] wakes up

const trackGuardsSleep = guardHistory => {
    const sleepLog = new Map();
    const getID = line => {
        line = Array.isArray(line) ? line : [line];
        return line[0].split('#')[1].split(' ')[0];
    };
    const _getTimestamp = line => {
        line = Array.isArray(line) ? line : [line];
        return line[0].split(':')[1].split(']')[0];
    };
    const getDuration = (from, to) => {
        from = Array.isArray(from) ? from : [from];
        to = Array.isArray(to) ? to : [to];

        from = _getTimestamp(from);
        to = _getTimestamp(to);
        return Number(to) - Number(from);
    };
    const getStartTime = line => {
        return Number(_getTimestamp(line));
    };
    const updateMinuteLog = (log, startTime, duration) => {
        for (let i = startTime; i < startTime + duration; i++) {
            log[i]++;
        }
    };

    guardHistory.forEach(history => {
        const id = getID(history.splice(0, 1));
        // if sleep record
        if (history.length > 1) {
            // see if guard exists yet
            if (!sleepLog.get(id)) {
                //if not, initialize guard
                sleepLog.set(id, new Uint8ClampedArray(60));
            }
            while (history.length) {
                updateMinuteLog(
                    sleepLog.get(id),
                    getStartTime(history[0]),
                    getDuration(
                        history.splice(0, 1)[0],
                        history.splice(0, 1)[0]
                    )
                );
            }
        }
    });
    return sleepLog;
};

const sleepPatterns = trackGuardsSleep(guardHistory);

const findHighestSleepAmount = sleepPatterns => {
    let guardResults = [];
    for (let item of sleepPatterns[Symbol.iterator]()) {
        // get greatest number
        const max = item[1].reduce((a, b) => (a > b ? a : b));
        guardResults.push([item[0], max]);
    }
    return guardResults.reduce((a, b) => (a[1] > b[1] ? a : b));
};

const maxSleeper = findHighestSleepAmount(sleepPatterns);

const findMaxSleeperMinute = (maxSleeper, sleepPatterns) => {
    let minuteLog = sleepPatterns.get(maxSleeper[0]);
    return minuteLog.indexOf(maxSleeper[1]);
};

const maxSleeperMinute = findMaxSleeperMinute(maxSleeper, sleepPatterns);
console.log(maxSleeper[0] * maxSleeperMinute);
