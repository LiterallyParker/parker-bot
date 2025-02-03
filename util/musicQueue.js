const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

const queue = new Map(); // Stores music queues per guild

function getQueue(guildId) {
    if (!queue.has(guildId)) {
        queue.set(guildId, { songs: [], player: createAudioPlayer({ behavior: NoSubscriberBehavior.Stop }), connection: null });
    }
    return queue.get(guildId);
}

async function playNextSong(guildId, message) {
    const serverQueue = getQueue(guildId);
    if (!serverQueue.songs.length) {
        serverQueue.connection?.destroy();
        queue.delete(guildId);
        return;
    }

    const song = serverQueue.songs[0];
    const stream = ytdl(song.url, { filter: 'audioonly' });
    const resource = createAudioResource(stream);

    if (!serverQueue.connection) {
        serverQueue.connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: guildId,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
    }

    serverQueue.player.play(resource);
    serverQueue.connection.subscribe(serverQueue.player);

    message.channel.send(`Now playing`);

    serverQueue.player.once('idle', () => {
        serverQueue.songs.shift();
        playNextSong(guildId, message);
    });
}

module.exports = { getQueue, playNextSong };