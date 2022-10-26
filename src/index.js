const { Client, Events, GatewayIntentBits } = require('discord.js');

const { slashCommands } = require('./commands.js');
const { events } = require('./events.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
});

// Botにコマンド登録
const RegisterCommands = (client, commands) => {
    client.commands = new Map();
    for (const command of commands) {
        client.commands.set(command.data.name, command);
    }
};

// Botにイベント登録
const RegisterEvents = (client, events) => {
    for (const event of events) {
        client.on(event.name, async (...args) => { await event.execute(...args) });
    }
};

// Botの初期化
const initializeBot = (name) => {
    console.log('Initialize Bot...');
    RegisterCommands(client, slashCommands);
    RegisterEvents(client, events);
    console.log(`Bot [${name}] Ready.`);
};

// イベント登録
client.once(Events.ClientReady, (client) => { initializeBot(client.user.username); });
client.login(process.env.TOKEN);
