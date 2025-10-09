const { Events } = require('discord.js');
const setupServer = require('../../discord/setup');
const { reactionRoles, messagesConfig } = require('../../../config');
const { protectReactions } = require('../../discord/reactions');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Bot is online as ${client.user.tag}`);

        const guild = client.guilds.cache.get(process.env.GUILD_ID);
        if (!guild) {
            console.error('Guild not found! Make sure GUILD_ID is set.');
            return;
        }

        try {
            await setupServer(guild);
            console.log('[Setup] Setup complete.');
            
            // Validate and restore bot reactions after setup
            if (messagesConfig.settings.validateOnStartup) {
                await validateBotReactions(guild);
            }
        } catch (error) {
            console.error(`[Setup] Failed to setup the server:`, error)
        }
    }
};

// Helper function to validate and restore bot reactions on startup
async function validateBotReactions(guild) {
    console.log('[Setup] Validating bot reactions...');
    
    for (const [categoryKey, category] of Object.entries(reactionRoles)) {
        if (!category.messageId || !category.emojis) continue;
        
        try {
            // Find the message in any channel
            let message = null;
            for (const channel of guild.channels.cache.values()) {
                if (channel.type !== 0) continue; // Only text channels
                try {
                    message = await channel.messages.fetch(category.messageId);
                    if (message) break;
                } catch (e) {
                    // Message not in this channel, continue searching
                }
            }
            
            if (message) {
                const requiredEmojis = Object.keys(category.emojis);
                await protectReactions(message, requiredEmojis);
                console.log(`[Setup] Validated reactions for category: ${categoryKey}`);
            } else {
                console.warn(`[Setup] Could not find message for category: ${categoryKey}`);
            }
        } catch (error) {
            console.error(`[Setup] Failed to validate reactions for category ${categoryKey}:`, error);
        }
    }
    
    console.log('[Setup] Reaction validation complete.');
}