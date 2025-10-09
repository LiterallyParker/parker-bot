const { SlashCommandBuilder } = require('discord.js');
const { reactionRoles, messagesConfig } = require('../../../config')
const { formatRoleSelectionDescription, buildRoleMappings } = require('../../discord/setup/formatters');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactionroles')
        .setDescription('Sets up role selection messages.'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        for (const [key, cat] of Object.entries(reactionRoles)) {
            const description = formatRoleSelectionDescription(key, cat, messagesConfig);

            // Populate compatibility mapping: cat.emojis: emoji -> config role id
            // and cat.roleMap: id -> roleName
            const { emojis, roleMap } = buildRoleMappings(cat);
            cat.emojis = emojis;
            cat.roleMap = roleMap;

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