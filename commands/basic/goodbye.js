module.exports = {
    name: "goodbye",
    description: "Does the basic bot goodbye.",
    async execute(message) {
        message.reply("See you next time!");
    }
};