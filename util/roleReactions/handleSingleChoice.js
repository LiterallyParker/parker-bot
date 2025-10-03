const removeOtherReactions = require('./removeOtherReactions');
const removeOtherRoles = require('./removeOtherRoles');

module.exports = async (reaction, user, cat, emoji, member) => {
    const fullMessage = await reaction.message.fetch();
    await removeOtherReactions(fullMessage, cat, emoji, user);
    await removeOtherRoles(member, reaction.message.guild, cat, emoji);
};