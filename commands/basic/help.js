module.exports = {
    name: "help",
    description: "Lists out commands.",
    async execute(message) {
        commands = [
            'help',
            'hello',
            'goodbye',
            'kirby',
            'userinfo (@username)',
            'register',
            'unregister',
            'stats',
            'attack @username',
        ]
        const commandList = commands.map(cmd => `* !${cmd}`).join("\n")
        message.reply(`_ _\n**Welcome to ParkerBot!**\n\n**Commands:**\n${commandList}\n\n Anything in (parenthesis) is optional.`);
    }
};