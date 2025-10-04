module.exports = async (member, nickname, reason = 'Bot nickname change') => {
    try {
        const updatedMember = await member.setNickname(nickname, reason);
        return updatedMember;
    } catch (error) {
        console.error(`Failed to set nickname for member ${member.user.tag}:`, error);
        throw error;
    }  
}