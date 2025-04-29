const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('Sends a message with buttons.'),

    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('button_hello')
                    .setLabel('Say Hello')
                    .setStyle(ButtonStyle.Primary),
                
                new ButtonBuilder()
                    .setCustomId('button_goodbye')
                    .setLabel('Say Goodbye')
                    .setStyle(ButtonStyle.Danger)
            );

        await interaction.reply({ content: "Click a button!", components: [row] });
    }
}