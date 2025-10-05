module.exports = async (guild, idOrName) => {
    if (!guild || !idOrName) return null;

    // If idOrName looks like an id (all digits) or is a string longer than 16, try id lookup first
    if (typeof idOrName === 'string') {
        const byId = guild.roles.cache.get(idOrName);
        if (byId) return byId;
    }

    // Fallback to name lookup
    return guild.roles.cache.find(r => r.name === idOrName) || null;
};