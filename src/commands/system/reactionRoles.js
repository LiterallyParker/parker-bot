const { SlashCommandBuilder } = require('discord.js');
const { reactionRoles } = require('../../../config')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactionroles')
        .setDescription('Sets up role selection messages.'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        for (const [key, cat] of Object.entries(reactionRoles)) {
            // Build description from new cat.roles structure
            let description = `**React to get a role (${key})**:\n\n`;

            // Populate compatibility mapping: cat.emojis: emoji -> config role id
            // and cat.roleMap: id -> roleName
            cat.emojis = {};
            cat.roleMap = {};

            for (const [roleName, meta] of Object.entries(cat.roles)) {
                const emoji = meta.emoji || '';
                const cfgId = meta.id;
                description += `${emoji}  →  ${roleName}\n`;
                if (emoji && cfgId !== undefined) cat.emojis[emoji] = cfgId;
                if (cfgId !== undefined) cat.roleMap[cfgId] = roleName;
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