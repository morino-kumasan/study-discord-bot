const { SlashCommandBuilder } = require('discord.js');

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
        .setDescription('Number of dice'))
    .addIntegerOption((option) => option
        .setName('threshold')
        .setMinValue(1)
        .setMaxValue(1000)
        .setDescription('Check threshold'))
    .addBooleanOption((option) => option
        .setName('secret')
        .setDescription('Private message'));

module.exports.execute = async (interaction) => {
    const minVal = 1;
    const maxVal = interaction.options.getInteger('max') || 100;
    const num = interaction.options.getInteger('num') || 1;
    const threshold = interaction.options.getInteger('threshold');
    const secret = interaction.options.getBoolean('secret') || false;

    const dices = new Array(num).fill().map(() => getRandom(minVal, maxVal));
    const sum = dices.reduce((prev, cur) => prev + cur, 0);
    const color = threshold ? (sum <= threshold ? 0x00aa00 : 0xaa0000) : 0xaaaaaa;
    await interaction.reply({
        embeds: [
            {
                color: color,
                title: `${num}d${maxVal}: ${dices.join(', ')}${threshold ? ` (${sum})` : ""}${threshold ? ` <= ${threshold}` : ""}`,
            }
        ],
        ephemeral: secret,
    });
};

const getRandom = (minVal, maxVal) => {
    return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}
