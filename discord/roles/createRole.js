module.exports = async (guild, { name, color = 'DEFAULT', permissions = [] }) => {
    const existing = guild.roles.cache.find(r => r.name === name);
    if (existing) return existing;

    try {
        const role = await guild.roles.create({
            name,
            color,
            permissions,
            reason: 'Initial setup of server roles',
        });
        return role;
    } catch (error) {
        console.error('Error creating role:', error);
        throw error;
    }
};