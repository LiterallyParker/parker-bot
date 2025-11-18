const { Events } = require('discord.js');
const { reactionRoles, messagesConfig, setupConfig } = require('../../../config');

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

        const { fetchRole } = require('../../discord/roles');

        // Check if this was a bot reaction that was removed and restore if needed
        let isBotManagedMessage = false;
        let requiredEmojis = [];
        
        for (const cat of Object.values(reactionRoles)) {
            if (cat.messageId && reaction.message.id === cat.messageId) {
                isBotManagedMessage = true;
                if (cat.emojis) {
                    requiredEmojis = Object.keys(cat.emojis);
                }
                break;
            }
        }

        // If this is a bot-managed message and a required emoji was removed, check if bot still has it
        if (isBotManagedMessage && requiredEmojis.includes(emoji) && setupConfig.protectBotReactions) {
            const existingReaction = reaction.message.reactions.cache.get(emoji) || 
                                   reaction.message.reactions.cache.find(r => r.emoji.name === emoji);
            
            // If the bot doesn't have this reaction anymore, restore it
            if (!existingReaction || !existingReaction.me) {
                try {
                    await reaction.message.react(emoji);
                    if (messagesConfig.settings.logRemovals) {
                        console.log(`Restored required bot reaction ${emoji} to managed message`);
                    }
                } catch (error) {
                    console.error(`Failed to restore bot reaction ${emoji}:`, error);
                }
            }
        }

    for (const cat of Object.values(reactionRoles)) {
            if (cat.messageId && reaction.message.id !== cat.messageId) continue;

            const mapped = cat.emojis && cat.emojis[emoji];
            if (!mapped) continue; // Skip if emoji isn't mapped

            const roleName = (cat.roleMap && cat.roleMap[mapped]) || mapped;
            const role = await fetchRole(guild, roleName);
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
