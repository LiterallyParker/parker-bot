const { rolesConfig } = require('../../../config');

module.exports = async (guild) => {
    console.log('[Setup] Starting messages setup...');

    // Prefer a channel named 'role-selection' if available
    let channel = guild.channels.cache.find(ch => ch.name === 'role-selection' && ch.type === 0);

    // Fallback: first text channel the bot can send to
    if (!channel) {
        channel = guild.channels.cache
            .filter(ch => ch.type === 0)
            .sort((a, b) => a.position - b.position)
            .first();
    }

    if (!channel) {
        console.warn('[Setup] No suitable text channel found for posting role selection messages. Skipping messages setup.');
        return;
    }

    for (const [key, cat] of Object.entries(rolesConfig)) {
        if (!cat.memberSelect) continue;

        // Build description from cat.roles mapping (roleName -> { emoji, ... })
        let description = `**React to get a role (${key})**:\n\n`;
        for (const [roleName, meta] of Object.entries(cat.roles)) {
            const emoji = meta.emoji || '';
            description += `${emoji}  →  ${roleName}\n`;
        }

        try {
            const message = await channel.send({ content: description });
            cat.messageId = message.id;

            // Build compatibility mapping:
            // cat.emojis: emoji -> configRoleId
            // cat.roleMap: configRoleId -> roleName
            cat.emojis = {};
            cat.roleMap = {};

            for (const [roleName, meta] of Object.entries(cat.roles)) {
                const emoji = meta.emoji;
                const cfgId = meta.id;
                if (!emoji) continue;
                cat.emojis[emoji] = cfgId;
                if (cfgId !== undefined) cat.roleMap[cfgId] = roleName;
                try {
                    await message.react(emoji);
                } catch (err) {
                    console.error(`[Setup] Failed to react with ${emoji} for category ${key}:`, err);
                }
            }

            console.log(`[Setup] Posted role selection message for category ${key} in #${channel.name}`);
        } catch (err) {
            console.error(`[Setup] Failed to post role selection message for category ${key}:`, err);
        }
    }

    console.log('[Setup] Messages setup complete.');
};
