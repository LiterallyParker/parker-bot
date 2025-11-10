/**
 * MessageReactionRemoveAll event handler
 *
 * Handles when all reactions are cleared from a message. If it's a bot-managed
 * message, this handler will restore the required reactions to keep the
 * reaction-role system functional.
 */
const { Events } = require('discord.js');
const { reactionRoles, messagesConfig, setupConfig } = require('../../../config');
const { protectReactions } = require('../../discord/reactions');

module.exports = {
    name: Events.MessageReactionRemoveAll,
    async execute(message) {
        if (!setupConfig.protectBotReactions) return;

        // Check if this is a bot-managed message
        for (const [categoryKey, category] of Object.entries(reactionRoles)) {
            if (category.messageId && message.id === category.messageId) {
                const requiredEmojis = Object.keys(category.emojis || {});
                if (requiredEmojis.length > 0) {
                    console.log(`[Protection] Restoring reactions for ${categoryKey} category message`);
                    await protectReactions(message, requiredEmojis);
                }
                break;
            }
        }
    }
};