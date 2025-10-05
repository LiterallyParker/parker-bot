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
        'U1Vk2oyatMdYs096Ety7',
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

    // ensure temp dir exists
    const tempDir = path.join(__dirname, '..', 'temp');
    try { fs.mkdirSync(tempDir, { recursive: true }); } catch (e) { /* ignore mkdir race errors */ }

    // use a small random suffix to reduce collision risk
    const fileName = `tts_${Date.now()}_${Math.random().toString(36).slice(2,8)}.mp3`;
    const filePath = path.join(tempDir, fileName);
    const writeStream = fs.createWriteStream(filePath);

    const nodeStream = stream.pipe ? stream : require('stream').Readable.fromWeb(stream);

    try {
        await new Promise((resolve, reject) => {
            nodeStream.pipe(writeStream);
            nodeStream.on('error', reject);
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        return filePath;
    } catch (err) {
        // cleanup partial file if it exists
        try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch (e) { /* ignore cleanup errors */ }
        throw err;
    }
}

module.exports = {
    generateSpeech
}