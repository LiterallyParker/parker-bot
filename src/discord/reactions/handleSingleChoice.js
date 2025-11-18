const removeOtherReactions = require('./removeOtherReactions');
const { removeRoles } = require('../members/roles');

module.exports = async (reaction, user, cat, emoji, member) => {
    const fullMessage = await reaction.message.fetch();
    await removeOtherReactions(fullMessage, cat, emoji, user);

    // Resolve the role being kept from the category mapping for this emoji
    const mapped = cat.emojis[emoji];
    const keptRoleName = (cat.roleMap && cat.roleMap[mapped]) || mapped;
    const { fetchRole } = require('../roles');
    const keptRole = await fetchRole(reaction.message.guild, keptRoleName);
    await removeRoles(member, reaction.message.guild, { cat, keep: [keptRole || keptRoleName] });
};