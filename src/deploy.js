const { REST, Routes } = require('discord.js');

// コマンド読み込み
const { slashCommands } = require('./commands');

// Guildにコマンド登録
const deployCommandDeclarations = async (commands) => {
    console.log('Deploying...');

    const token = process.env.TOKEN;
    const clientId = process.env.CLIENT_ID;
    const guildId = process.env.GUILD_ID;

    try {
        const rest = new REST({ version: '10' }).setToken(token);
        const data = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands.map((command) => command.data.toJSON()) });
        console.log(`Finished: ${data.length} commands`);
    } catch (e) {
        console.error(e);
    }
};

deployCommandDeclarations(slashCommands);
