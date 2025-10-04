module.exports = async (member, reason = 'Bot kicked member') => {
    try {
        await member.kick(reason);
        return member;
    } catch (error) {
        console.error(`Failed to kick member ${member.user.tag}:`, error);
        throw error;
    }
};