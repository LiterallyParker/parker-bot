const { PermissionsBitField } = require('discord.js');

const normalizePermission = (perm) => {
    if (!perm) return perm;
    if (typeof perm !== 'string') return perm;
    // If it already looks like PascalCase (contains lowercase), return as-is
    if (/[a-z]/.test(perm)) return perm;
    // Convert UPPER_SNAKE to PascalCase: MANAGE_MESSAGES -> ManageMessages
    return perm.toLowerCase().split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
};

module.exports = async (guild, { name, color = 0, permissions = [] }) => {
    const existing = guild.roles.cache.find(r => r.name === name);
    if (existing) return existing;

    // Normalize permissions to formats the library accepts
    const normalizedPermissions = (permissions || []).map(normalizePermission);

    try {
        const role = await guild.roles.create({
            name,
            color,
            permissions: normalizedPermissions,
            reason: 'Initial setup of server roles',
        });
        return role;
    } catch (error) {
        console.error('Error creating role:', error);
        throw error;
    }
};