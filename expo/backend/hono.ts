import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { appRouter } from "./trpc/app-router";
import { createContext } from "./trpc/create-context";
import { getOrGenerateAudio, getCacheStatus } from "./tts-cache";

const app = new Hono();

app.use("*", cors());

app.use(
  "/trpc/*",
  trpcServer({
    endpoint: "/api/trpc",
    router: appRouter,
    createContext,
  }),
);

app.get("/", (c) => {
  return c.json({ status: "ok", message: "Beacon API is running" });
});

app.get("/tts/:devotionalId", async (c) => {
  const devotionalId = c.req.param("devotionalId");
  const text = c.req.query("text");

  if (!text) {
    return c.json({ error: "Missing text parameter" }, 400);
  }

  try {
    console.log(`[TTS Endpoint] Request for devotional: ${devotionalId}`);
    const audioBuffer = await getOrGenerateAudio(devotionalId, text);

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error(`[TTS Endpoint] Error:`, error);
    return c.json({ error: "Failed to generate audio" }, 500);
  }
});

app.get("/tts-status/:devotionalId", async (c) => {
  const devotionalId = c.req.param("devotionalId");
  const status = getCacheStatus(devotionalId);
  return c.json(status);
});

export default app;
