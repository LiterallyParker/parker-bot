const removeRole = require('./removeRole');

// config: { keep: [], cat: optionalCategory }
// keep entries can be Role objects, role ids (string), or role names (string)
module.exports = async (member, guild, config = {}) => {
    const keep = Array.isArray(config.keep) ? config.keep : [];
    const cat = config.cat;

    // Normalize keep into sets for fast lookup
    const keepIds = new Set();
    const keepNames = new Set();

    for (const k of keep) {
        if (!k) continue;
        if (typeof k === 'string') {
            // try id first
            const byId = guild.roles.cache.get(k);
            if (byId) keepIds.add(byId.id);
            else keepNames.add(k);
        } else if (k.id) {
            keepIds.add(k.id);
        } else if (k.name) {
            keepNames.add(k.name);
        }
    }

    // Helper to decide if a role should be removed
    const shouldRemove = (role) => {
        if (!role) return false;
        // never remove @everyone (role with same id as guild id) or managed roles
        if (role.managed) return false;
        if (role.id === guild.id) return false;
        if (keepIds.has(role.id)) return false;
        if (keepNames.has(role.name)) return false;
        return true;
    };

    const { fetchRole } = require('../../roles');

    if (cat && cat.emojis) {
        for (const emoji of Object.keys(cat.emojis)) {
            const roleIdOrName = cat.emojis[emoji];
            const role = await fetchRole(guild, roleIdOrName);
            if (!role) continue;
            if (!shouldRemove(role)) continue;
            await removeRole(member, role);
        }
    } else {
        // Remove all removable roles from the member (except keep and protected roles)
        for (const role of member.roles.cache.values()) {
            if (!shouldRemove(role)) continue;
            await removeRole(member, role);
        }
    }
};
