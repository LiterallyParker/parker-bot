const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');

function createClient() {
    if (!process.env.ELEVENLABS_API_KEY) {
        throw new Error('Missing ELEVENLABS_API_KEY in environment');
    }

    return new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });
}

module.exports = { createClient };
