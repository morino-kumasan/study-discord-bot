const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('dice_gui')
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
        .setDescription('Check threshold'));

module.exports.execute = async (interaction) => {
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('roll')
                .setLabel('Roll')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('end')
                .setLabel('End')
                .setStyle(ButtonStyle.Danger),
        );

    const { maxVal, num, threshold } = getOptions(interaction);
    await interaction.reply({ content: `${num}d${maxVal}${threshold ? ` <= ${threshold}` : ""}`, components: [row] });
    RegisterEvent(interaction, { maxVal, num, threshold });
};

const getOptions = (interaction) => ({
    maxVal: interaction.options.getInteger('max') || 100,
    num: interaction.options.getInteger('num') || 1,
    threshold: interaction.options.getInteger('threshold'),
});

const getRandom = (minVal, maxVal) => {
    return Math.floor(Math.random() * (maxVal - minVal)) + minVal;
}

const onButtonPressed = async (buttonId, interaction, { maxVal, num, threshold }) => {
    if (buttonId == 'roll') {
        const minVal = 1;
        const dices = new Array(num).fill().map(() => getRandom(minVal, maxVal));
        const sum = dices.reduce((prev, cur) => prev + cur, 0);
        const color = threshold ? (sum <= threshold ? 0x00aa00 : 0xaa0000) : 0xaaaaaa;
        const username = interaction.member.nickname || interaction.user.username;

        await interaction.deferUpdate();
        await interaction.editReply({
            embeds: [
                {
                    color: color,
                    description: `${num}d${maxVal}: ${dices.join(', ')}${threshold ? ` (${sum})` : ""}${threshold ? ` <= ${threshold}` : ""}`,
                    title: username,
                },
                ...interaction.message.embeds.filter((embed) => embed.title != username)
            ]
        });
    } else if (buttonId == 'end') {
        await interaction.update({ components: [] });
    }
};

const onButtonEnd = async (collected) => {
};

const RegisterEvent = (interaction, options) => {
    interaction.channel.createMessageComponentCollector({
        filter: (i) => ['roll', 'end'].includes(i.customId),
        time: 60000,
    })
        .on('collect', async (i) => {
            try {
                return onButtonPressed(i.customId, i, options);
            } catch (e) {
                console.error(e);
            }
        })
        .on('end', async (collected) => onButtonEnd(collected));
}
