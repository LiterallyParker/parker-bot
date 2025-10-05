const { SlashCommandBuilder } = require('discord.js');
const { reactionRoles } = require('../../../config')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactionroles')
        .setDescription('Sets up role selection messages.'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        for (const [key, cat] of Object.entries(reactionRoles)) {
            let description = `**React to get a role (${key})**:\n\n`;
            for (const [emoji, roleName] of Object.entries(cat.emojis)) {
                description += `${emoji}  →  ${roleName}\n`;
            }

            const message = await interaction.channel.send({ content: description});
            cat.messageId = message.id;

            for (const emoji of Object.keys(cat.emojis)) {
                try {
                    await message.react(emoji);
                } catch (error) {
                    console.error(`Failed to react with ${emoji}:`, error);
                }
            }
        }

        await interaction.editReply({ content: 'Reaction role messages set up!', ephemeral: true });
    }
};