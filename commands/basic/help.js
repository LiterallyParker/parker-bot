module.exports = {
    name: "help",
    description: "Lists out commands.",
    async execute(message) {
        commands = [
            'help',
            'hello',
            'goodbye',
            'userinfo (@username)',
        ]
        const commandList = commands.map(cmd => `* !${cmd}`).join("\n")
        message.reply("```Commands:\n" + commandList + "```");
    }
};