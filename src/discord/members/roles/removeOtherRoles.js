const removeRole = require('./removeRole');

// keepRole can be a Role object, a role id (string), or a role name (string).
module.exports = async (member, guild, cat, keepRole) => {
    let keepRoleId = null;
    let keepRoleName = null;

    if (keepRole) {
        if (typeof keepRole === 'string') {
            // try to resolve as id first
            const byId = guild.roles.cache.get(keepRole);
            if (byId) {
                keepRoleId = byId.id;
            } else {
                keepRoleName = keepRole;
            }
        } else if (keepRole.id) {
            keepRoleId = keepRole.id;
        } else if (keepRole.name) {
            keepRoleName = keepRole.name;
        }
    }

    for (const otherEmoji of Object.keys(cat.emojis)) {
        const otherRoleName = cat.emojis[otherEmoji];
        const otherRole = guild.roles.cache.find(r => r.name === otherRoleName);
        if (!otherRole) continue;

        if (keepRoleId && otherRole.id === keepRoleId) continue;
        if (keepRoleName && otherRole.name === keepRoleName) continue;

        await removeRole(member, otherRole);
    }
};