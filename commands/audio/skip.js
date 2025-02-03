const { getQueue, playNextSong } = require('../../util/musicQueue');

module.exports = {
    name: 'skip',
    description: 'Skips the current song',
    execute(message) {
        const serverQueue = getQueue(message.guild.id);

        if (!serverQueue.songs.length) {
            return message.reply("No songs in queue to skip.");
        }

        serverQueue.player.stop();
        message.reply("Skipped");
    }
};
