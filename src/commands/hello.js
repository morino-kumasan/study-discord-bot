const { SlashCommandBuilder } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Say hello.');

module.exports.execute = async (interaction) => {
    await interaction.reply('Hello');
};
