const fs = require('fs');
const path = require('path');
const { createClient } = require('./client');

async function textToStream(text) {
    const client = createClient();
    const stream = await client.textToSpeech.convert(
        'XsmrVB66q3D4TaXVaWNF',
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

    return stream;
}

async function generateSpeech(text) {
    const stream = await textToStream(text);

    // ensure temp dir exists
    const tempDir = path.join(__dirname, '..', 'temp');
    try { fs.mkdirSync(tempDir, { recursive: true }); } catch (e) { }

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
        try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch (e) { }
        throw err;
    }
}

function cleanup(filePath) {
    try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath); } catch (e) { }
}

module.exports = { generateSpeech, cleanup, textToStream };
