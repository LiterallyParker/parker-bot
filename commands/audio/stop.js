const { getQueue } = require('../../util/musicQueue');

module.exports = {
    name: 'stop',
    description: 'Stops music and clears the queue',
    execute(message) {
        const serverQueue = getQueue(message.guild.id);

        if (!serverQueue.songs.length) {
            return message.reply("No music is playing.");
        }

        serverQueue.songs = []; // Clear the queue
        serverQueue.player.stop(); // Stop the current song
        serverQueue.connection?.destroy(); // Disconnect bot from voice channel
        serverQueue.connection = null;

        message.reply("Stopped music and cleared the queue.");
    }
};