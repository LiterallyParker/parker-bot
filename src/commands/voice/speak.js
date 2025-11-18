const { SlashCommandBuilder } = require('discord.js');
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
} = require('@discordjs/voice');
const fs = require('fs');
const { generateSpeech } = require('../../elevenlabs/tts');
let currentAudio = null;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('speak')
        .setDescription('Joins your VC and plays generated speech.')
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('What the bot should say.')
                .setRequired(true)
        ),
    
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const member = interaction.member;

        if (!member.voice.channel) {
            return interaction.reply({
                content: 'You need to be in a voice channel first.',
                ephemeral: true
            });
        }
        
        await interaction.deferReply();

        if (currentAudio) {
            const { filePath } = currentAudio;
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            currentAudio = null;
        }

        let filePath;
        try {
            filePath = await generateSpeech("Parker bot is here to say: " + text);

            const connection = currentAudio ? currentAudio.connection : joinVoiceChannel({
                channelId: member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
                selfDeaf: false,
            });

            const player = currentAudio ? currentAudio.connection : createAudioPlayer()
            const resource = createAudioResource(filePath);
            connection.subscribe(player);
            player.play(resource);

            currentAudio = { player, filePath, connection };

            player.once(AudioPlayerStatus.Idle, () => {
                connection.destroy();
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                currentAudio = null;
            });

            await interaction.editReply('Playing your message!');
        } catch (error) {
            console.error('Error in /speak command:', error);
            if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
            currentAudio = null;
            await interaction.editReply('There was an error generating or playing the speech.');
        }
    }
}