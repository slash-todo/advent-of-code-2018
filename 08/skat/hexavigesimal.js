const toHexavigesimal = num => {
    let ret = '';
    while (parseInt(num) > 0) {
        --num;
        ret += String.fromCharCode('A'.charCodeAt(0) + (num % 26));
        num /= 26;
    }
    return ret
        .split('')
        .reverse()
        .join('');
};

module.exports = toHexavigesimal;
