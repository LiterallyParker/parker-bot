const { User } = require("../models");
const responses = require("../responses");

module.exports = async function getUser({ discordId }) {
    try {
        const user = await User.findOne({ where: { discordId }});
        console.log(discordId);
        console.log(user);
        if (!user) {
            throw responses.error({ message: "User not found. use !register to join the game." });
        };
        return responses.success({ message: "User found.", data: user });
    } catch (error) {
        console.error("Error querying user:", error);
        throw responses.error({ message: "Internal server error." });
    };
};