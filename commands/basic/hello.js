module.exports = {
    name: "hello",
    description: "Does the basic bot greeting.",
    async execute(message) {
        const greetings = [
            "Hello!", "Hi!", "Hey!", "Greetings!", "Salutations!", 
            "Howdy!", "Yo!", "What's up?", "Good day!", "Bonjour!", 
            "Hola!", "Ciao!", "Hallo!", "Olá!", "Namaste!", 
            "Salam!", "Konnichiwa!", "Annyeong!", "Zdravstvuyte!", "Shalom!", 
            "Sawubona!", "Merhaba!", "Yassas!", "Hej!", "Hei!", 
            "Hallå!", "Aloha!", "Ahoy!", "Szia!", "Mabuhay!", "Existance is pain."
          ];

        const randGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        message.reply(randGreeting);
    }
};