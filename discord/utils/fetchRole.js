module.exports = async (guild, roleName) => {
    return guild.roles.cache.find(r => r.name === roleName) || null;
};