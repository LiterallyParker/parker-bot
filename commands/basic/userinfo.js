const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription("Replies with info about you or the selected user.")
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user you want info about')
                .setRequired(false)
        ),
    async execute(interaction) {
        const target = interaction.options.getUser('target') || interaction.user;
        const member = interaction.guild.members.cache.get(target.id);

        const responses = [
            `**Username: **\n    ${target.username}`,
            `**Global Name: **\n    ${target.globalName || "None"}`,
            `**Server Nickname: **\n    ${member?.nickname || "None"}`,
            `**Profile image: **${target.displayAvatarURL()}`,
        ];

        await interaction.reply(responses.join("\n\n"));
    }
};