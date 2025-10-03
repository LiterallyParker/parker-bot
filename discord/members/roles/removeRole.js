module.exports = async (member, role) => {
    if (!role || !member.roles.cache.has(role.id)) return;
    try {
        await member.roles.remove(role);
    } catch (error) {
        console.error(`Failed to remove role ${role.name} from member ${member.user.tag}:`, error);
    }
}