module.exports.name = 'interactionCreate';

module.exports.execute = async (interaction) => {
    processCommand(interaction);
};

const processCommand = async (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        await interaction.reply(`Command not found: ${interaction.commandName}`);
        return;
    }

    console.log(`[${interaction.user.username}] ${interaction}`);

    try {
        return command.execute(interaction);
    } catch (e) {
        console.log(e);
    }
};
