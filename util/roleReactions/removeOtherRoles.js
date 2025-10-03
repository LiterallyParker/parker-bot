const { removeRole } = require("../../discord/utils");

module.exports = async (member, guild, cat, emoji) => {
    for (const otherEmoji of Object.keys(cat.emojis)) {
        if (otherEmoji === emoji) continue;

        const otherRoleName = cat.emojis[otherEmoji];
        const otherRole = guild.roles.cache.find(r => r.name === otherRoleName);
        await removeRole(member, otherRole);
    }
};