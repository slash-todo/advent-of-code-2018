const inputs = require('./input.js');
// const inputs = [-6, +3, +8, +5, -6];

const findRepeatingFrequency = nums => {
    let ticker = 0;
    let seenFrequencies = [];
    let λ = 0;
    const maxCheckMultiplier = 1000;

    const _checkForMatch = currentFrequency => {
        return seenFrequencies.indexOf(currentFrequency);
    };

    const getValueOfCurrentTick = (tick, array) => {
        return array[tick % array.length];
    };

    // loop until match is found or max attempts is reached,
    // so as not to infinite loop
    while (ticker < nums.length * maxCheckMultiplier) {
        // break the loop if the frequncy has been seen
        const checkAttemptIndex = _checkForMatch(λ);
        if (checkAttemptIndex > 0) {
            console.log('Match Found!');
            console.log(`Result: ${seenFrequencies[checkAttemptIndex]}`);
            return;
        }

        // push the seen frequency to array
        seenFrequencies.push(λ);

        // update the frequency
        λ = λ + getValueOfCurrentTick(ticker, nums);

        // bump the ticker by 1
        ticker++;

        // quick little progress bar that states num of attempts
        if (ticker % nums.length === 0) {
            console.log(
                `Attempt ${Math.floor(
                    ticker / nums.length
                )} of ${maxCheckMultiplier}`
            );
        }
    }

    // if you fail, this logs why and how
    console.warn('\nNo Match Found!');
    console.log(`Checks: ${ticker}`);
    console.log(`Input Loops ${ticker / nums.length}`);
    console.log(
        `Last Frequency Seen: ${seenFrequencies[seenFrequencies.length - 1]}`
    );
};

findRepeatingFrequency(inputs);
