const { Stats } = require("../models");
const responses = require("../responses");
const getUser = require("./getUser");

module.exports = async function getStats({ discordId }) {
    try {
        const response = await getUser({ discordId });
        const user = response.data;
        const stats = await Stats.findOne({ where: { userId: user.id }});
        if (!stats) {
            throw responses.error({
                message: "Stats not found."
            });
        };
        return responses.success({ message: "Stats found.", data: stats });
    } catch (error) {
        console.error("Error querying stats:", error);
        return responses.error({ message: "Internal server error." });
    }
}