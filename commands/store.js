const store = require("../classes/store");

module.exports = {
    name: "store",
    description: "Sends today's store.",
    async execute(message) {
        let strProducts = "Items:\n"
        strProducts += store.items.map(item => {
            console.log(item);
            const title = `* ${item.name}`;
            const price = `-= $${item.price} =-`;
            const ATT = item.ATT ? `-= **ATT -> ${item.ATT}** =-\n` : "";
            const DEF = item.DEF ? `-= **DEF -> ${item.DEF}** =-\n` : "";
            const HP = item.HP ? `-= **HP -> ${item.HP}** =-\n` : "";
            const MAX_HP = item.MAX_HP ? `-= **MAX HP -> ${item.MAX_HP}** =-\n` : "";
            const desc = item.description + "\n";

            return `${title}\n${price}\n${ATT}${DEF}${HP}${MAX_HP}${item.description}\n`
        }).join("\n");
        message.reply(strProducts);
    }
};