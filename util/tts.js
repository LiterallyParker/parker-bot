const fs = require('fs');
const path = require('path');
const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');
require('dotenv').config();

if (!process.env.ELEVENLABS_API_KEY) {
    console.error("Missing ELEVENLABS_API_KEY in .env file");
    process.exit(1);
};

const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY
});

async function generateSpeech(text) {
    const stream = await elevenlabs.textToSpeech.convert(
        'MKlLqCItoCkvdhrxgtLv',
        {
            text,
            voiceSettings: {
                speed: 1,
                stability: 1,
                similarityBoost: 1
            },
            modelId: "eleven_multilingual_v2",
            outputFormat: "mp3_44100_128",
        }
    );

    const filePath = path.join(__dirname, `../temp/tts_${Date.now()}.mp3`);
    const writeStream = fs.createWriteStream(filePath);

    const nodeStream = stream.pipe ? stream : require('stream').Readable.fromWeb(stream);

    await new Promise((resolve, reject) => {
        nodeStream.pipe(writeStream);
        nodeStream.on('error', reject);
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });

    return filePath;
}

module.exports = {
    generateSpeech
}