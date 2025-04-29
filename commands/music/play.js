const { joinVoiceChannel, createAudioPlayer, AudioPlayerStatus, createAudioResource } = require("@discordjs/voice");
const { SlashCommandBuilder } = require("discord.js");
const scdl = require("soundcloud-downloader").default;
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a SoundCloud song in a voice channel.')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('The SoundCloud track URL to play')
                .setRequired(true)
        ),

    async execute(interaction) {
        const url = interaction.options.getString('url');

        const member = interaction.guild.members.cache.get(interaction.user.id);
        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply("You need to join a voice channel first.");
        };

        try {
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            const stream = await scdl.download(url);
            const resource = createAudioResource(stream);
            
            const player = createAudioPlayer();
            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy();
            });

            return interaction.reply("Now playing...");
        } catch (error) {
            console.error(`Error playing music: ${error}`);
            return interaction.reply('There was an error trying to play the song.')
        }
    }
}