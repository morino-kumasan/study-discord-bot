'use strict';

const Discord = require('discord.js');
const Config = require('./config.json');
const StackStorage = require('./stack_storage.js');
const Utility = require('./utility.js');

const { token, prefix } = Config;

const client = new Discord.Client({ intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
] });

function initializeBot() {
    console.log('Initialize Bot...');
    console.log(`settings: prefix=${prefix}`)
    console.log('Bot Running.');
}

function finalizeBot(message) {
    console.log('Finalize Bot...');
    message.channel.send(`Bye`);

    setTimeout(() => {
        client.destroy();
        process.exit();
    }, 3000);
}

function showHelp(message) {
    message.channel.send(`help text`);
}

function execArgs(message, args, prefix) {
    if (args[0] == `${prefix}bye`) {
        finalizeBot(message);
    } else if (args[0] == `${prefix}help`) {
        showHelp(message);
    }
}

function onMessage(message) {
    if (!message.content.startsWith(prefix)) {
        return;
    }

    const args = message.content.split(/[ \t]+/);
    console.log('Message Received.', args);

    if (args.length == 0) {
        return;
    }

    try {
        execArgs(message, args, prefix);
        StackStorage.execArgs(message, args, prefix);
        Utility.execArgs(message, args, prefix);
    } catch(e) {
        console.log(e);
    }
}

client.once('ready', () => { initializeBot(); });
client.on('messageCreate', (message) => { onMessage(message); });
client.login(token);
