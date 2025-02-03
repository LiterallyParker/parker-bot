const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus, entersState } = require("@discordjs/voice");
const { exec } = require("child_process");
const fs = require("fs");
const { getQueue } = require("../util/musicQueue");

module.exports = {
    name: "say",
    description: "Joins VC and says something.",
    async execute(message, args) {
        if (!message.member.voice.channel) {
            return message.reply("You must be in a voice channel.");
        };

        const serverQueue = getQueue(message.guild.id);
        if (serverQueue.player.state.status !== AudioPlayerStatus.Idle) {
            return message.reply("I am currently playing music. Wait until it's finished.");
        };

        const sentence = args.join(" ");
        if (!sentence) {
            return message.reply("Provide something for me to say (!say {phrase to say})");
        };

        const voiceChannel = message.member.voice.channel;
        const filePath = './tts.wav';

        // Timeout to ensure the file is generated
        setTimeout(() => {
            exec(`flite -voice rms -t "${sentence}" -o ${filePath}`, async (error) => {
                if (error) {
                    console.error("TTS Error:", error);
                    return message.reply("Error generating speech.");
                }

                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                });

                try {
                    await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
                    const player = createAudioPlayer();
                    const resource = createAudioResource(filePath);

                    // Timeout to ensure audio is played before cleanup
                    player.on(AudioPlayerStatus.Idle, () => {
                        setTimeout(() => {
                            connection.destroy();
                            fs.unlink(filePath, (err) => {
                                if (err) console.error("File delete error:", err);
                            });
                        }, 500);  // Adjust if necessary for the duration of the file

                    });

                    player.play(resource);
                    connection.subscribe(player);
                } catch (error) {
                    console.error("Voice Connection Error:", error);
                    message.reply("Failed to join VC.");
                    connection.destroy();
                }
            });
        }, 500); // Wait 500ms to allow file generation
    }
};
