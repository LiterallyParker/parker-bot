const { colorize } = require('../../util/colors');
const { setupConfig } = require("../../../config");
const { reactionRoles } = require("../../../config");
const { protectReactions } = require('../../discord/reactions');

module.exports = async (guild) => {
    // Helper to run a setup step with nice console framing
    const runStep = async (modPath, label) => {
    const header = `\n[SETUP] ${label}`;
    const footer = `[SETUP] ${label} complete\n`;
    console.log(colorize(header, 'magenta'));
        try {
            const mod = require(modPath);
            if (typeof mod === 'function') {
                await mod(guild);
            } else {
                console.warn(`[SETUP] ${label} module does not export a function, skipping.`);
            }
        } catch (e) {
            console.error(`${label} setup failed:`, e);
        }
    console.log(colorize(footer, 'magenta'));
    };

    // Run setup steps with explicit ordering and nicely framed logs
    await runStep('./roles', 'Role Creation');
    await runStep('./channels', 'Channel Creation');
    await runStep('./permissions', 'Permission Assignment');
    await runStep('./messages', 'Messages Setup');

    if (setupConfig.validateOnStartup) {
        await validateBotReactions(guild);
    };
    console.log(colorize('\n[SETUP] Setup complete! beep boop', 'bright'));
};

// Helper function to validate and restore bot reactions on startup
async function validateBotReactions(guild) {
    console.log(colorize('\n[SETUP] Validating bot reactions...', 'magenta'));
    
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
                console.log(colorize(`Validated reactions for category: ${categoryKey}`, 'green'));
            } else {
                console.warn(colorize(`Could not find message for category: ${categoryKey}`, 'yellow'));
            }
        } catch (error) {
            console.error(colorize(`Failed to validate reactions for category ${categoryKey}:`, 'red'), error);
        }
    }
    
    console.log(colorize('[SETUP] Reaction validation complete.\n', 'magenta'));
}