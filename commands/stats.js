const { Stats, User } = require("../models");
const { getStats } = require("../services");

module.exports = {
    name: "stats",
    description: "Displays a user's stats",
    async execute(message) {
        const author = message.author;

        try {
            const response = await getStats({ discordId: author.id });
            if (response.error) {
                return message.reply(response.message)
            }
            const stats = response.data;

            return message.reply(`**Your stats:**\n    **HP**  ->  **${stats.HP}**\n    **ATT**  ->  **${stats.ATT}**\n    **DEF**  ->  **${stats.DEF}**\n\n**Dabloons  ->  $${stats.CUR}**\n\n**Attacks used**  ->  **${stats.ATT_USED}/3**`)
        } catch (error) {
            console.log("Error fetching user stats:", error);
            message.reply("Error fetching stats.");
        }
    }
};