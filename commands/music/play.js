const { getQueue, playNextSong } = require('../util/musicQueue');

module.exports = {
    name: 'play',
    description: 'Plays music from a YouTube URL with a queue system (Max 10 songs)',
    async execute(message, args) {
        if (!args.length) return message.reply("Provide a YouTube URL!");
        if (!message.member.voice.channel) return message.reply("Join a voice channel first!");

        const serverQueue = getQueue(message.guild.id);

        if (serverQueue.songs.length >= 10) {
            return message.reply("Queue is full! Max 10 songs.");
        }

        const song = { url: args[0], title: `Song ${serverQueue.songs.length + 1}` };
        serverQueue.songs.push(song);

        if (serverQueue.songs.length === 1) {
            playNextSong(message.guild.id, message);
        } else {
            message.reply(`Added to queue: **${song.title}**`);
        }
    }
};