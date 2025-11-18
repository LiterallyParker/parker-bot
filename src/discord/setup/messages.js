/**
 * Messages setup
 *
 * Sets up automated messages for the server including:
 * 1. Rules message in #rules
 * 2. Verification message in #introduction (react with ✅ to get Member role)
 * 3. Role selection messages in #roles for other categories
 *
 * The verification system gates access to the server - @everyone can only see
 * Information and Getting Started categories until they react to get Member role.
 *
 * Message content is configured in config/messages.js for easy customization.
 * 
 * This setup detects and reuses existing messages to prevent duplication on restarts.
 */
const { rolesConfig, messagesConfig } = require('../../../config');
const fetchChannel = require('../../discord/channels/fetchChannel');
const { formatRoleSelectionDescription, buildRoleMappings } = require('./formatters');

// Helper function to find existing bot messages that match expected content
async function findExistingMessage(channel, expectedContent, botId) {
    try {
        // Fetch recent messages (last 100)
        const messages = await channel.messages.fetch({ limit: 100 });
        
        // Look for bot messages that match our expected content pattern
        for (const message of messages.values()) {
            if (message.author.id !== botId) continue;
            
            // Check if message content matches (allowing for minor variations)
            const messageContent = message.content.toLowerCase().trim();
            const expectedLower = expectedContent.toLowerCase().trim();
            
            // For verification messages, check for key phrases
            if (expectedLower.includes('welcome') && messageContent.includes('welcome')) {
                return message;
            }
            
            // For role selection messages, check for "react to get a role" pattern
            if (expectedLower.includes('react to get a role') && messageContent.includes('react to get a role')) {
                return message;
            }
            
            // For rules messages, check for "server rules" pattern
            if (expectedLower.includes('server rules') && messageContent.includes('server rules')) {
                return message;
            }
            
            // Exact match fallback
            if (messageContent === expectedLower) {
                return message;
            }
        }
    } catch (error) {
        console.warn(`[Setup] Could not search for existing messages in ${channel.name}:`, error);
    }
    return null;
}

// Helper function to setup or reuse a message
async function setupMessage(channel, content, categoryKey, category, requiredEmojis, botId) {
    let message = await findExistingMessage(channel, content, botId);
    
    if (message) {
        
        // Update the category with the existing message ID (if category exists)
        if (category) {
            category.messageId = message.id;
        }
        
        // Ensure all required reactions are present
        for (const emoji of requiredEmojis) {
            const existingReaction = message.reactions.cache.get(emoji) || 
                                   message.reactions.cache.find(r => r.emoji.name === emoji);
            
            if (!existingReaction || !existingReaction.me) {
                try {
                    await message.react(emoji);
                    console.log(`[Setup] Added missing reaction ${emoji} to existing message`);
                } catch (err) {
                    console.error(`[Setup] Failed to add reaction ${emoji}:`, err);
                }
            }
        }
        
        return message;
    } else {
        // Create new message
        try {
            message = await channel.send({ content });
            if (category) {
                category.messageId = message.id;
            }
            
            // Add all required reactions
            for (const emoji of requiredEmojis) {
                try {
                    await message.react(emoji);
                } catch (err) {
                    console.error(`[Setup] Failed to react with ${emoji}:`, err);
                }
            }
            
            console.log(`[Setup] Created new message for ${categoryKey} in #${channel.name}`);
            return message;
        } catch (err) {
            console.error(`[Setup] Failed to create message for ${categoryKey}:`, err);
            return null;
        }
    }
}

// Helper function to format rules message
function formatRulesMessage() {
    const rulesConfig = messagesConfig.rules;
    let message = `${rulesConfig.title}\n\n${rulesConfig.header}\n\n`;
    
    // Add rules with proper formatting
    const ruleLines = rulesConfig.rulesList.map((rule, index) => {
        if (rulesConfig.numbering) {
            // Auto-numbering (strip existing numbers if any)
            const cleanRule = rule.replace(/^\*\*\d+\.\s*/, '**');
            return `**${index + 1}.** ${cleanRule.replace(/^\*\*/, '')}`;
        } else {
            // Use rules as-is (they can include manual numbering)
            return rule;
        }
    });
    
    message += ruleLines.join(rulesConfig.separator);
    message += `\n\n${rulesConfig.footer}`;
    
    // Add contact footer if configured
    if (rulesConfig.contactFooter) {
        message += rulesConfig.contactFooter;
    }
    
    return message;
}

module.exports = async (guild) => {
    // Step 4: Messages Setup
    const botId = guild.client.user.id;

    // First, set up the verification message in the introduction channel
    const introChannel = fetchChannel(guild, 'introduction', 0);
    if (introChannel) {
        const verificationConfig = messagesConfig.verification;
        const verificationMessage = `${verificationConfig.title}\n\n${verificationConfig.content}`;
        
        // Set up the community category for Member role assignment
        const targetCategory = rolesConfig[verificationConfig.roleCategory];
        if (targetCategory && targetCategory.roles[verificationConfig.roleName]) {
            // Build compatibility mapping for verification role
            const roleData = targetCategory.roles[verificationConfig.roleName];
            targetCategory.emojis = { [verificationConfig.emoji]: roleData.id };
            targetCategory.roleMap = { [roleData.id]: verificationConfig.roleName };
            
            // Setup or reuse verification message
            const message = await setupMessage(
                introChannel, 
                verificationMessage, 
                'verification', 
                targetCategory, 
                [verificationConfig.emoji],
                botId
            );
            
            if (message) {
                console.log('Ensured message in #introduction');
            }
        }
    } else {
        console.warn('Introduction channel not found, skipping verification message');
    }

    // Set up rules message in the rules channel
    const rulesChannel = fetchChannel(guild, 'rules', 0);
    if (rulesChannel) {
        const rulesContent = formatRulesMessage();
        
        // Rules don't need reactions, so we use setupMessage with empty emojis array
        const rulesMessage = await setupMessage(
            rulesChannel,
            rulesContent,
            'rules',
            null, // No category config needed
            [], // No emojis needed
            botId
        );
        
        if (rulesMessage) {
            console.log('Ensured message in #rules');
        }
    } else {
        console.warn('Rules channel not found, skipping rules message');
    }

    // Then set up regular role selection messages
    // Prefer a channel named 'roles' if available
    let channel = fetchChannel(guild, 'roles', 0);

    // Fallback: first text channel the bot can send to
    if (!channel) {
        channel = guild.channels.cache
            .filter(ch => ch.type === 0)
            .sort((a, b) => a.position - b.position)
            .first();
    }

    if (!channel) {
        console.warn('No suitable text channel found for posting role selection messages. Skipping messages setup.');
        return;
    }

    const roleSelectionConfig = messagesConfig.roleSelection;
    
    for (const [key, cat] of Object.entries(rolesConfig)) {
        if (!cat.memberSelect) continue;

        const description = formatRoleSelectionDescription(key, cat, messagesConfig);

        const { emojis, roleMap, requiredEmojis } = buildRoleMappings(cat);
        cat.emojis = emojis;
        cat.roleMap = roleMap;

        // Setup or reuse role selection message
        const message = await setupMessage(
            channel,
            description,
            key,
            cat,
            requiredEmojis,
            botId
        );

        if (message) {
            console.log(`Ensured message for ${key === 'countries' ? key.replace('ies', 'y') : key.slice(0, -1)} role in #${channel.name}`);
        }
    }
};
