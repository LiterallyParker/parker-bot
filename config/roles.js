const { Colors } = require('discord.js')

module.exports = {
    admin: {
        id: 1,
        memberSelect: false,
        singleChoice: false,
        roles: {
            "Admin": {
                "id": 1,
                "emoji": "🛡️",
                "color": Colors.Red,
                "permissions": ["ADMINISTRATOR"]
            },
            "Moderator": {
                "id": 2,
                "emoji": "🔨",
                "color": Colors.Orange,
                "permissions": ["MANAGE_MESSAGES", "KICK_MEMBERS", "BAN_MEMBERS"]
            },
            "Helper": {
                "id": 3,
                "emoji": "❓",
                "color": Colors.Yellow,
                "permissions": ["MANAGE_MESSAGES"]
            }
        }
    },
    pronouns: {
        id: 2,
        memberSelect: true,
        singleChoice: true,
        roles: {
            "He/Him": {
                "id": 4,
                "emoji": "👨",
                "color": Colors.Blue,
                "permissions": []
            },
            "She/Her": {
                "id": 5,
                "emoji": "👩",
                "color": Colors.Fuchsia,
                "permissions": []
            },
            "They/Them": {
                "id": 6,
                "emoji": "🧑",
                "color": Colors.Gold,
                "permissions": []
            },
        }
    },
    interests: {
        id: 3,
        memberSelect: true,
        singleChoice: false,
        roles: {
            "Art": {
                "id": 7,
                "emoji": "🎨",
                "color": Colors.LuminousVividPink,
                "permissions": []
            },
            "Music": {
                "id": 8,
                "emoji": "🎵",
                "color": Colors.DarkBlue,
                "permissions": []
            },
            "Gaming": {
                "id": 9,
                "emoji": "🎮",
                "color": Colors.Yellow,
                "permissions": []
            },
            "Programming": {
                "id": 10,
                "emoji": "💻",
                "color": Colors.Red,
                "permissions": []
            },
            "Bot User": {
                "id": 11,
                "emoji": "🤖",
                "color": Colors.DarkButNotBlack,
                "permissions": []
            }
        }
    },
    countries: {
        id: 4,
        memberSelect: true,
        singleChoice: true,
        roles: {
            'USA': {
                "id": 12,
                'emoji': '🇺🇸',
                'color': Colors.Blue,
                'permissions': []
            },
            'Canada': {
                "id": 13,
                'emoji': '🇨🇦',
                'color': Colors.Red,
                'permissions': []
            },
            'UK': {
                "id": 14,
                'emoji': '🇬🇧',
                'color': Colors.White,
                'permissions': []
            },
            'Australia': {
                "id": 15,
                'emoji': '🇦🇺',
                'color': Colors.Green,
                'permissions': []
            },
            'India': {
                "id": 16,
                'emoji': '🇮🇳',
                'color': Colors.Orange,
                'permissions': []
            },
        },
    },
};