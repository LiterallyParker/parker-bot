const { Events } = require('discord.js');
const { reactionRoles, messagesConfig } = require('../../../config');
const { assignRole } = require('../../discord/members/roles');
const { fetchRole } = require('../../discord/roles');
const { handleSingleChoice } = require('../../discord/reactions');
const fetchMember = require('../../discord/reactions/fetchMember');

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

        // Check if this message is managed by the bot for reaction roles
        let isBotManagedMessage = false;
        let allowedEmojis = [];
        
        for (const cat of Object.values(reactionRoles)) {
            if (cat.messageId && reaction.message.id === cat.messageId) {
                isBotManagedMessage = true;
                if (cat.emojis) {
                    allowedEmojis = Object.keys(cat.emojis);
                }
                break;
            }
        }

        // If this is a bot-managed message and the emoji is not allowed, remove it
        if (isBotManagedMessage && !allowedEmojis.includes(emoji) && messagesConfig.settings.removeUnauthorizedReactions) {
            try {
                await reaction.users.remove(user.id);
                if (messagesConfig.settings.logRemovals) {
                    console.log(`Removed unauthorized reaction ${emoji} from ${user.tag} on bot-managed message`);
                }
            } catch (error) {
                console.error(`Failed to remove unauthorized reaction ${emoji} from ${user.tag}:`, error);
            }
            return; // Don't process unauthorized reactions
        }

        // Process authorized reactions
        for (const cat of Object.values(reactionRoles)) {
            if (cat.messageId && reaction.message.id !== cat.messageId) continue;

            const mapped = cat.emojis && cat.emojis[emoji];
            if (!mapped) continue;

            // mapped may be a roleName or a config role id; if it's an id, resolve via cat.roleMap
            const roleName = (cat.roleMap && cat.roleMap[mapped]) || mapped;
            const role = await fetchRole(guild, roleName);

            if (cat.singleChoice) {
                await handleSingleChoice(reaction, user, cat, emoji, member);
            };

            await assignRole(member, role);
            console.log(`Assigned role ${roleName} to ${user.tag}`);
        }
    }
};