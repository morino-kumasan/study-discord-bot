'use strict';

function rollDice(message, args) {
    const minVal = 1;
    const maxVal = parseInt(args.length >= 2 ? args[1] : 6);
    const count = parseInt(args.length >= 3 ? args[2] : 1);
    const nums = new Array(count).fill().map(() => getRandom(minVal, maxVal));
    message.channel.send(`(${maxVal}, ${count}) => ${nums.join(', ')}`);
}

function showHelp(message) {

}

function getRandom(minVal, maxVal) {
    return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}

exports.execArgs = (message, args, prefix) => {
    if (args[0] == `${prefix}dice`) {
        rollDice(message, args);
    } else if (args[0] == `${prefix}help`) {
        showHelp(message);
    }
}
