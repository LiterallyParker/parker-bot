const { Colors } = require('discord.js')

module.exports = {
    "admin": {
        "id": 1,
        "memberSelect": false,
        "singleChoice": false,
        "roles": {
            "Admin": {
                "id": "1423820170316611795",
                "emoji": "🛡️",
                "color": 15548997,
                "permissions": [
                    "ADMINISTRATOR"
                ]
            },
            "Moderator": {
                "id": "1424510133001785375",
                "emoji": "🔨",
                "color": 15105570,
                "permissions": [
                    "MANAGE_MESSAGES",
                    "KICK_MEMBERS",
                    "BAN_MEMBERS"
                ]
            },
            "Helper": {
                "id": "1424510134448820295",
                "emoji": "❓",
                "color": 16705372,
                "permissions": [
                    "MANAGE_MESSAGES"
                ]
            }
        }
    },
    "community": {
        "id": 2,
        "memberSelect": false,
        "singleChoice": false,
        "roles": {
            "Member": {
                "id": 4,
                "emoji": "✅",
                "color": 5763719,
                "permissions": []
            },
            "Bot": {
                "id": "1334587878260342818",
                "emoji": "🤖",
                "color": 9807270,
                "permissions": []
            }
        }
    },
    "pronouns": {
        "id": 3,
        "memberSelect": true,
        "singleChoice": true,
        "roles": {
            "He/Him": {
                "id": "1423803887986413588",
                "emoji": "👨",
                "color": 3447003,
                "permissions": []
            },
            "She/Her": {
                "id": "1423803890381492315",
                "emoji": "👩",
                "color": 15418782,
                "permissions": []
            },
            "They/Them": {
                "id": "1423803891723665509",
                "emoji": "🧑",
                "color": 15844367,
                "permissions": []
            }
        }
    },
    "interests": {
        "id": 4,
        "memberSelect": true,
        "singleChoice": false,
        "roles": {
            "Drawing": {
                "id": "1424593659730591804",
                "emoji": "🎨",
                "color": 15277667,
                "permissions": []
            },
            "Music": {
                "id": "1424593660862922764",
                "emoji": "🎵",
                "color": 2123412,
                "permissions": []
            },
            "Writing": {
                "id": "1424593661894856734",
                "emoji": "✍️",
                "color": 10038562,
                "permissions": []
            },
            "Gaming": {
                "id": "1423803895787819129",
                "emoji": "🎮",
                "color": 16705372,
                "permissions": []
            },
            "Programming": {
                "id": "1423803896488394884",
                "emoji": "💻",
                "color": 15548997,
                "permissions": []
            }
        }
    },
    "countries": {
        "id": 5,
        "memberSelect": true,
        "singleChoice": true,
        "roles": {
            "USA": {
                "id": "1423803897285316739",
                "emoji": "🇺🇸",
                "color": 3447003,
                "permissions": []
            },
            "Canada": {
                "id": "1423803898069520504",
                "emoji": "🇨🇦",
                "color": 15548997,
                "permissions": []
            },
            "UK": {
                "id": "1423803898816368651",
                "emoji": "🇬🇧",
                "color": 16777215,
                "permissions": []
            },
            "Australia": {
                "id": "1423803899839512648",
                "emoji": "🇦🇺",
                "color": 5763719,
                "permissions": []
            },
            "India": {
                "id": "1423803900695285770",
                "emoji": "🇮🇳",
                "color": 15105570,
                "permissions": []
            }
        }
    }
}
