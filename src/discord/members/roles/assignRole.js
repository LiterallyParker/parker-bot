module.exports = async (member, role) => {
    if (role && !member.roles.cache.has(role.id)) {
        try {
            await member.roles.add(role);
        } catch (error) {
            console.error(error);
        }
    };
};