module.exports = async (reaction, user) => {
    const guild = reaction.message.guild;
    return await guild.members.fetch(user.id);
};