'use strict';
const discord = require('discord.js');
const config = require('./config.json');

const { token, prefix } = config;

const client = new discord.Client({ intents: [
    discord.Intents.FLAGS.GUILDS,
    discord.Intents.FLAGS.GUILD_MESSAGES,
] });

function InitializeBot() {
    console.log('Initialize Bot...');
    console.log(`settings: prefix=${prefix}`)
    console.log('Bot Running.');
}

function FinalizeBot(message) {
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

function OnMessage(message) {
    console.log('Message Received.');

    if (message.content == `${prefix}help`) {
        showHelp(message);
    } else if (message.content == `${prefix}quit`) {
        FinalizeBot(message);
    }
}

client.once('ready', () => { InitializeBot(); });
client.on('messageCreate', (message) => { OnMessage(message); });
client.login(token);
