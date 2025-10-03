module.exports = async (member, excludeEveryone = true) => {
    if (excludeEveryone) {
        return member.roles.cache.filter(role => role.name !== '@everyone');
    }
    return member.roles.cache;
};