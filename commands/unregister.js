const { User, Stats } = require("../models");

module.exports = {
    name: "unregister",
    description: "Removes a user from The Game.",
    async execute(message) {
        const author = message.author;

        try {
            const existingUser = await User.findOne({ where: { discordId: author.id }});

            if (existingUser) {
                await Stats.destroy({ where: { userId: existingUser.id }});
                await existingUser.destroy();
                return message.reply(`User successfully removed from The Game.`);
            };

            message.reply("User is not registered to The Game.");

        } catch (error) {
            console.error("Error removing user from the database:", error);
            message.reply("Error while removing user from The Game.");
        };
    }
};