module.exports = {
    name: "help",
    description: "Lists out commands.",
    async execute(message) {
        const commandList = Array.from(message.client.commands.values())
            .map(cmd => `* !${cmd.name} - ${cmd.description}`)
            .join("\n");

        message.reply(`Commands:\n${commandList}`);
    }
};