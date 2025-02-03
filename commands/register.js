const { User, Stats } = require("../models");

module.exports = {
    name: "register",
    description: "Registers a new user to The Game.",
    async execute(message) {
        const author = message.author;

        try {
            const existingUser = await User.findOne({ where: { discordId: author.id }});

            if (!existingUser) {
                console.log(author.id);
                const user = await User.create({
                    discordId: author.id,
                    username: author.username
                });
                const stats = await Stats.create({
                    userId: user.id,
                    HP: 100,
                    ATT: 10,
                    DEF: 0,
                    MAX_HP: 100,
                    ATT_USED: 0,
                    CUR: 10,
                });
                return message.reply(`User successfully registered to The Game.\n\n**Id:**\n  ${user.discordId}\n\n**Username:**\n  ${user.username}\n\n**Stats:**\n    **HP**  ->  **${stats.HP}**\n    **ATT**  ->  **${stats.ATT}**\n    **DEF**  ->  **${stats.DEF}**\n\n**Dabloons:**\n    **$${stats.CUR}**`);
            };

            message.reply("User is already registered to The Game.");

        } catch (error) {
            console.error("Error registering user to the database:", error);
            message.reply("Error while registering user to The Game.");
        };
    }
};