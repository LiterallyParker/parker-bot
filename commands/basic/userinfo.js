const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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

        const embed = new EmbedBuilder()
            .setColor('#5865f2')
            .setTitle(`__User Info__`)
            .setThumbnail(target.displayAvatarURL())
            .addFields(
                { name: '**Username**', value: target.username, inline: true },
                { name: '**Global Name**', value: target.globalName || 'None', inline: true },
                { name: '**Server Nickname**', value: member?.nickname || 'None', inline: true }
            )
            .setFooter({ text: `Requested by ${interaction.user.tag}` });

        await interaction.reply({ embeds: [embed] });
    }
};