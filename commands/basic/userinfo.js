module.exports = {
    name: "userinfo",
    description: "Replies with the requested user info, or author info if no user requested.",
    async execute(message) {
        const user = message.mentions.users.first() || message.author;

        const member = message.guild.members.cache.get(user.id);

        const responses = [
            `**Username: **\n    ${user.username}`,
            `**Global Name: **\n    ${user.globalName}`,
            `**Server Nickname: **\n    ${member.nickname || "None"}`,
            `**Profile image: **${user.displayAvatarURL()}`,
        ]

        message.reply(responses.join("\n\n"));
    }
};