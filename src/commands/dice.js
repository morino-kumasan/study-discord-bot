const { SlashCommandBuilder } = require('discord.js');

const getRandom = (minVal, maxVal) => {
    return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}

module.exports.data = new SlashCommandBuilder()
    .setName('dice')
    .setDescription('Roll dice(s).')
    .addIntegerOption((option) => option
        .setName('max')
        .setMinValue(1)
        .setMaxValue(1000)
        .setDescription('Max dice number'))
    .addIntegerOption((option) => option
        .setName('num')
        .setMinValue(1)
        .setMaxValue(100)
        .setDescription('Number of dice'));

module.exports.execute = async (interaction) => {
    const minVal = 1;
    const maxVal = interaction.options.getInteger('max') || 6;
    const num = interaction.options.getInteger('num') || 1;

    const dices = new Array(num).fill().map(() => getRandom(minVal, maxVal));
    await interaction.reply(`${maxVal}d${num} => ${dices.join(', ')}`);
};
