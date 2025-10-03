const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    once: true,
    execute(member) {
        const channel = member.guild.systemChannel;
        if (channel?.isTextBased()) {
            channel.send(`WELCOME TO THE SERVER ${member.user.username.toUpperCase()}!`);
        }
    }
};