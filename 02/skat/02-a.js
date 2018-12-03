console.clear();
const inputs = require('./input.js');
// const inputs = ['bababc'];
let ticker = 0;

const getCheckSum = list => {
    let results = { twice: 0, thrice: 0 };
    list.forEach(item => {
        const letterSequence = item.split('').sort();
        const _findTwosOrThrees = (string, results) => {
            let twiceFlag = false;
            let thriceFlag = false;
            let buffer = [string.shift()];
            while (string.length > 0 && (!twiceFlag || !thriceFlag)) {
                // pull first letter from stack
                const letter = string.shift();

                // when there is a switch in letter value
                if (buffer[0] !== letter) {
                    if (buffer.length === 2 && !twiceFlag) {
                        twiceFlag = true;
                    } else if (buffer.length === 3 && !thriceFlag) {
                        thriceFlag = true;
                    }
                    buffer = [letter];
                } else {
                    buffer.push(letter);
                }
            }
            ticker++;
            if (twiceFlag) results.twice += 1;
            if (thriceFlag) results.thrice += 1;
            console.log(
                `
Ticker: ${ticker}
Flags: [${twiceFlag ? '2' : ' '}|${thriceFlag ? '3' : ' '}]
Results: (2)-${results.twice} | (3)-${results.thrice}
Current Checksum: ${results.twice * results.thrice}`
            );
        };

        _findTwosOrThrees(letterSequence, results);
    });
    return results.twice * results.thrice;
};

console.log(getCheckSum(inputs));
