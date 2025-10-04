const { Colors } = require('discord.js')

module.exports = {
    pronouns: {
        singleChoice: true,
        roles: {
            "He/Him": {
                "emoji": "👨",
                "color": Colors.Blue,
                "permissions": []
            },
            "She/Her": {
                "emoji": "👩",
                "color": Colors.Fuchsia,
                "permissions": []
            },
            "They/Them": {
                "emoji": "🧑",
                "color": Colors.Gold,
                "permissions": []
            },
        }
    },
    interests: {
        singleChoice: false,
        roles: {
            "Art": {
                "emoji": "🎨",
                "color": Colors.LuminousVividPink,
                "permissions": []
            },
            "Music": {
                "emoji": "🎵",
                "color": Colors.DarkBlue,
                "permissions": []
            },
            "Gaming": {
                "emoji": "🎮",
                "color": Colors.Yellow,
                "permissions": []
            },
            "Programming": {
                "emoji": "💻",
                "color": Colors.Red,
                "permissions": []
            },
            "Bot User": {
                "emoji": "🤖",
                "color": Colors.DarkButNotBlack,
                "permissions": []
            }
        }
    },
    countries: {
        singleChoice: true,
        roles: {
            'USA': {
                'emoji': '🇺🇸',
                'color': Colors.Blue,
                'permissions': []
            },
            'Canada': {
                'emoji': '🇨🇦',
                'color': Colors.Red,
                'permissions': []
            },
            'UK': {
                'emoji': '🇬🇧',
                'color': Colors.White,
                'permissions': []
            },
            'Australia': {
                'emoji': '🇦🇺',
                'color': Colors.Green,
                'permissions': []
            },
            'India': {
                'emoji': '🇮🇳',
                'color': Colors.Orange,
                'permissions': []
            },
        },
    },
};