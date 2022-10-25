const { SlashCommandBuilder } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('bye')
    .setDescription('bye bye bot.');

module.exports.execute = async (interaction) => {
    await interaction.reply('Bye');
    interaction.client.destroy();
    process.exit();
};
