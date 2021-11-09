'use strict';

let storage = {
    stack: [],
};

function pushString(message, args) {
    args.map((v, i) => {
        if (i > 0) {
            storage.stack.push(v);
        }
    });
}

function popString(message, args) {
    const count = parseInt(args.length >= 2 ? args[1] : 1);
    for (let i = 0; i < count; i++) {
        const value = storage.stack.pop();
        message.channel.send(`pop: ${value}`);
    }
}

function shuffleStrings(message, args) {
    let ary = storage.stack;

    for (let i = ary.length - 1; i >= 1; i--) {
        let j = getRandom(0, i);
        [ary[i], ary[j]] = [ary[j], ary[i]];
    }

    console.log(storage.stack);
}

function showHelp(message) {

}

exports.execArgs = (message, args, prefix) => {
    if (args[0] == `${prefix}push`) {
        pushString(message, args);
    } else if (args[0] == `${prefix}pop`) {
        popString(message, args);
    } else if (args[0] == `${prefix}shuffle`) {
        shuffleStrings(message, args);
    } else if (args[0] == `${prefix}help`) {
        showHelp(message);
    }
}
