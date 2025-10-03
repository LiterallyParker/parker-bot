const { removeReaction } = require('../../discord/utils');

module.exports = async (fullMessage, cat, emoji, user) => {
    for (const otherEmoji of Object.keys(cat.emojis)) {
        if (otherEmoji === emoji) continue;
        await removeReaction(fullMessage, otherEmoji, user);
    }
};