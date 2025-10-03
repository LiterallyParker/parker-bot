module.exports = {
    pronouns: {
        messageId: null, // set when creating the message
        singleChoice: true,
        emojis: {
            '👨': 'He/Him',
            '👩': 'She/Her',
            '🧑': 'They/Them',
        },
    },
    interests: {
        messageId: null,
        singleChoice: false,
        emojis: {
            '🎨': 'Art',
            '🎵': 'Music',
            '🎮': 'Gaming',
            '💻': 'Programming',
            '🤖': 'Bot User',
        },
    },
    countries: {
        messageId: null,
        singleChoice: true,
        emojis: {
            '🇺🇸': 'USA',
            '🇨🇦': 'Canada',
            '🇬🇧': 'UK',
            '🇦🇺': 'Australia',
            '🇮🇳': 'India',
        },
    },
};