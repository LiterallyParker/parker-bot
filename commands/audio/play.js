const yts = require('yt-search'); // Install with: npm install yt-search
const { getQueue, playNextSong } = require('../../util/musicQueue');

module.exports = {
    name: 'play',
    description: 'Plays music from a YouTube URL or searches YouTube if a link is not provided.',
    async execute(message, args) {
        if (!args.length) return message.reply("Provide a YouTube URL or search term!");
        if (!message.member.voice.channel) return message.reply("Join a voice channel first!");

        let songUrl = args[0];
        let songTitle = "";

        // Check if the argument is a valid URL
        if (!songUrl.startsWith('https://')) {
            // Search YouTube for the first result
            const searchResult = await yts(args.join(' '));
            if (!searchResult.videos.length) {
                return message.reply("No results found on YouTube!");
            }
            songUrl = searchResult.videos[0].url;
            songTitle = searchResult.videos[0].title;
        } else {
            songTitle = `Song ${serverQueue.songs.length + 1}`;
        }

        const serverQueue = getQueue(message.guild.id);

        if (serverQueue.songs.length >= 10) {
            return message.reply("Queue is full! Max 10 songs.");
        }

        const song = { url: songUrl, title: songTitle };
        serverQueue.songs.push(song);

        if (serverQueue.songs.length === 1) {
            playNextSong(message.guild.id, message);
        } else {
            message.reply(`Added to queue: **${song.title}**`);
        }
    }
};