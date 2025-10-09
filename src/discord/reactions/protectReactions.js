/**
 * Reaction protection utility
 *
 * Ensures that bot-managed reaction-role messages maintain their required
 * reactions. If someone manually removes a bot reaction, this helper can
 * restore it to keep the message functional.
 */

module.exports = async (message, requiredEmojis) => {
    if (!message || !requiredEmojis || !Array.isArray(requiredEmojis)) return;

    for (const emoji of requiredEmojis) {
        const existingReaction = message.reactions.cache.get(emoji) || 
                                message.reactions.cache.find(r => r.emoji.name === emoji);
        
        if (!existingReaction || !existingReaction.me) {
            try {
                await message.react(emoji);
                console.log(`Restored required reaction ${emoji} to bot-managed message`);
            } catch (error) {
                console.error(`Failed to restore reaction ${emoji}:`, error);
            }
        }
    }
};