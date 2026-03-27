const audioCache = new Map<string, { buffer: ArrayBuffer; generatedAt: number }>();

const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function simpleHash(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function getCacheKey(devotionalId: string, textHash: string): string {
  return `${devotionalId}_${textHash}`;
}

function cleanExpiredCache() {
  const now = Date.now();
  for (const [key, value] of audioCache.entries()) {
    if (now - value.generatedAt > CACHE_TTL_MS) {
      audioCache.delete(key);
      console.log(`[TTS Cache] Expired entry removed: ${key}`);
    }
  }
}

async function generateElevenLabsAudio(text: string): Promise<ArrayBuffer> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID || "pNInz6obpgDQGcFmaJgB";

  if (!apiKey) {
    throw new Error("ELEVENLABS_API_KEY is not configured");
  }

  console.log(`[ElevenLabs] Generating audio for ${text.length} characters with voice ${voiceId}`);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.75,
          style: 0.3,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[ElevenLabs] API error ${response.status}: ${errorText}`);
    throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  console.log(`[ElevenLabs] Generated audio: ${(arrayBuffer.byteLength / 1024).toFixed(1)}KB`);
  return arrayBuffer;
}

export async function getOrGenerateAudio(devotionalId: string, text: string): Promise<ArrayBuffer> {
  cleanExpiredCache();

  const textHash = simpleHash(text);
  const cacheKey = getCacheKey(devotionalId, textHash);

  const cached = audioCache.get(cacheKey);
  if (cached) {
    console.log(`[TTS Cache] HIT for ${cacheKey} (${(cached.buffer.byteLength / 1024).toFixed(1)}KB)`);
    return cached.buffer;
  }

  console.log(`[TTS Cache] MISS for ${cacheKey}, generating...`);
  const audioBuffer = await generateElevenLabsAudio(text);

  audioCache.set(cacheKey, {
    buffer: audioBuffer,
    generatedAt: Date.now(),
  });

  console.log(`[TTS Cache] Stored ${cacheKey}. Cache size: ${audioCache.size}`);
  return audioBuffer;
}

export function getCacheStatus(devotionalId: string): { cached: boolean; cacheSize: number } {
  const hasMatch = Array.from(audioCache.keys()).some(key => key.startsWith(devotionalId));
  return { cached: hasMatch, cacheSize: audioCache.size };
}
