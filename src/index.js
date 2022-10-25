const { Client, Events, GatewayIntentBits } = require('discord.js');

const StackStorage = require('./stack_storage.js');
const Utility = require('./utility.js');

const prefix = "/";
const token = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
] });

function initializeBot(name) {
    console.log('Initialize Bot...');
    console.log(`settings: prefix=${prefix}`)
    console.log(`Bot [${name}] Running.`);
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

client.once(Events.ClientReady, (client) => { initializeBot(client.user.username); });
//client.on('messageCreate', (message) => { onMessage(message); });
client.login(token);
