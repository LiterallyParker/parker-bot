module.exports = async (message, emoji, user) => {
    const reaction = message.reactions.resolve(emoji);
    if (!reaction) return;

    try {
        await reaction.users.remove(user.id);
    } catch (error) {
        console.error(`Failed to remove reaction ${emoji} from user ${user.tag}:`, error);
    }
}