const { Events } = require('discord.js');
const { reactionRoles } = require('../../config');

module.exports = {
    name: Events.MessageReactionRemove,
    async execute(reaction, user) {
        if (user.bot) return;

        // Fetch partials
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();

        const emoji = reaction.emoji.name;
        const guild = reaction.message.guild;
        const member = await guild.members.fetch(user.id);

        for (const cat of Object.values(reactionRoles)) {
            if (cat.messageId && reaction.message.id !== cat.messageId) continue;

            const roleName = cat.emojis[emoji];
            if (!roleName) continue; // Skip if emoji isn't mapped

            const role = guild.roles.cache.find(r => r.name === roleName);
            if (role && member.roles.cache.has(role.id)) {
                try {
                    await member.roles.remove(role);
                    console.log(`Removed role ${role.name} from ${user.tag}`);
                } catch (err) {
                    console.error(`Failed to remove role ${role.name} from ${user.tag}`, err);
                }
            }
        }
    },
};
