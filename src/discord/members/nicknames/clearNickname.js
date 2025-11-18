const setNickname = require("./setNickname");

module.exports = async (member) => {
    try {
        const updatedMember = await setNickname(member, null, 'Bot cleared nickname');
        return updatedMember;
    } catch (error) {
        console.error(`Failed to clear nickname for member ${member.user.tag}:`, error);
        throw error;
    }
};