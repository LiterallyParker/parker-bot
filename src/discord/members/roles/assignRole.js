module.exports = async (member, role) => {
    if (!role) {
        console.error('[Role Assignment] No role provided');
        return;
    }
    
    if (!member) {
        console.error('[Role Assignment] No member provided');
        return;
    }
    
    if (member.roles.cache.has(role.id)) {
        return;
    }
    
    try {
        await member.roles.add(role);
    } catch (error) {
        if (error.code === 50013) {
            console.error(`[Role Assignment] Missing permissions to assign role ${role.name} to ${member.user.tag}. Check bot permissions and role hierarchy.`);
        } else if (error.code === 50001) {
            console.error(`[Role Assignment] Missing access to assign role ${role.name}. Bot may not be in the guild or role may not exist.`);
        } else {
            console.error(`[Role Assignment] Failed to assign role ${role.name} to ${member.user.tag}:`, error);
        }
    }
};