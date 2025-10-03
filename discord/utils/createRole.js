module.exports = async (guild, { name, color = 'DEFAULT', permissions = [] }) => {
    let role = guild.roles.cache.find(r => r.name === name);
    if (!role) {
        role = await guild.roles.create({
            name,
            color,
            permissions,
            reason: 'Initial setup of server roles',
        });
    }
    return role;
};