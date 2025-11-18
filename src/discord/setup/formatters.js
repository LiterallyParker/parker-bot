/**
 * Role selection message formatters and helpers
 *
 * Provides reusable utilities to format the role selection message content
 * and to build the emoji/role mappings used by the reaction-role system.
 */

/**
 * Build the role selection description for a category.
 * Returns a string ready to post as a message.
 */
function formatRoleSelectionDescription(key, cat, messagesConfig) {
    const roleSelectionConfig = messagesConfig.roleSelection;
    const customCategory = messagesConfig.customCategories[key];

    let description = '';

    if (customCategory) {
        // Use custom message format
        description = `${customCategory.title}\n${customCategory.content}${roleSelectionConfig.separator}`;

        // Add role lines
        const roleLines = [];
        for (const [roleName, meta] of Object.entries(cat.roles)) {
            const emoji = meta.emoji || '';
            if (emoji) {
                roleLines.push(
                    roleSelectionConfig.roleLineTemplate
                        .replace('{emoji}', emoji)
                        .replace('{roleName}', roleName)
                );
            }
        }
        description += roleLines.join(roleSelectionConfig.spacing);

        // Add footer if exists
        if (customCategory.footer) {
            description += customCategory.footer;
        }
    } else {
        // Use default template
        description =
            roleSelectionConfig.titleTemplate.replace('{categoryName}', key) +
            roleSelectionConfig.separator;

        // Add role lines
        const roleLines = [];
        for (const [roleName, meta] of Object.entries(cat.roles)) {
            const emoji = meta.emoji || '';
            if (emoji) {
                roleLines.push(
                    roleSelectionConfig.roleLineTemplate
                        .replace('{emoji}', emoji)
                        .replace('{roleName}', roleName)
                );
            }
        }
        description += roleLines.join(roleSelectionConfig.spacing);

        // Add footer if exists in template
        if (roleSelectionConfig.footer) {
            description += roleSelectionConfig.footer;
        }
    }

    return description;
}

/**
 * Build compatibility mappings and required emojis for a category's roles.
 * Returns { emojis, roleMap, requiredEmojis }.
 */
function buildRoleMappings(cat) {
    const emojis = {};
    const roleMap = {};
    const requiredEmojis = [];

    for (const [roleName, meta] of Object.entries(cat.roles)) {
        const emoji = meta.emoji;
        const cfgId = meta.id;
        if (!emoji) continue;
        emojis[emoji] = cfgId;
        if (cfgId !== undefined) roleMap[cfgId] = roleName;
        requiredEmojis.push(emoji);
    }

    return { emojis, roleMap, requiredEmojis };
}

module.exports = {
    formatRoleSelectionDescription,
    buildRoleMappings,
};
