const { Events } = require('discord.js');
const { messagesConfig } = require('../../../config');

module.exports = {
    name: Events.GuildMemberAdd,
    once: true,
    execute(member) {
        const channel = member.guild.systemChannel;
        if (channel?.isTextBased()) {
            channel.send(messagesConfig.welcome.message.replace('_', `${member.username}`));
        }
    }
};