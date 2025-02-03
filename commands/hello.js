module.exports = {
    name: "hello",
    description: "Does the basic bot greeting.",
    async execute(message) {
        message.reply("Hello! ParkerBot is armed and ready.");
    }
};