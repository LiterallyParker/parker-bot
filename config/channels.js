module.exports = {
    "Information": {
        type: 4,
        channels: {
            "welcome": { type: 0, topic: "Welcome to the server!" },
            "role-selection": { type: 0, topic: "Select your roles" },
            "rules": { type: 0, topic: "Server rules" }
        }
    },
    "Chats": {
        type: 4,
        channels: {
            "general": { type: 0, topic: "General chat" },
            "art": { type: 0, topic: "Art chat" },
            "music": { type: 0, topic: "Music chat" },
            "gaming": { type: 0, topic: "Gaming chat" },
            "programming": { type: 0, topic: "Gaming chat" },
        }
    },
    "Voice": {
        type: 4,
        channels: {
            "chat-1": { type: 0, topic: "Voice 1 text chat" },
            "chat-2": { type: 0, topic: "Voice 2 text chat" },
            "chat-3": { type: 0, topic: "Voice 3 text chat" },
            "voice-1": { type: 2 },
            "voice-2": { type: 2 },
            "voice-3": { type: 2 },
        }
    },
    "Staff": {
        type: 4,
        channels: {
            "mod-chat": { type: 0, topic: "Staff discussions", permissionOverwrites: [] },
            "mod-voice": { type: 2 },
            "mod-commands": { type: 0, topic: "Staff commands", permissionOverwrites: [] }
        }
    },
    "Bot": {
        type: 4,
        channels: {
            "about-parker-bot": { type: 0, topic: "ParkerBot about" },
            "parker-bot": { type: 0, topic: "ParkerBot commands" },
            "parker-bot-spam": { type: 0, topic: "ParkerBot spam" },
            "parker-bot-music": { type: 0, topic: "ParkerBot music" },
        }
    }
}