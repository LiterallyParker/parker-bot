const { Events } = require('discord.js');
const { reactionRoles } = require('../../config');
const { assignRole, fetchMember, fetchRole } = require('../../discord/utils');
const { handleSingleChoice } = require('../../util/roleReactions');

module.exports = {
    name: Events.MessageReactionAdd,
    async execute(reaction, user) {
        if (user.bot) return;

        // Fetch partials
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();

        // Check if the reaction is in the reactionRoles mapping
        const emoji = reaction.emoji.name;
        const guild = reaction.message.guild;
        const member = await fetchMember(reaction, user);

        for (const cat of Object.values(reactionRoles)) {
            if (reaction.message.id !== cat.messageId) continue;

            const roleName = cat.emojis[emoji];
            if (!roleName) continue;

            const role = await fetchRole(guild, roleName);

            if (cat.singleChoice) {
                await handleSingleChoice(reaction, user, cat, emoji, member);
            };

            await assignRole(member, role);
            console.log(`Assigned role ${roleName} to ${user.tag}`);
        }
    }
};