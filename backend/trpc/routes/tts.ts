import * as z from "zod";
import { createTRPCRouter, publicProcedure } from "../create-context";
import { getCacheStatus } from "../../tts-cache";

export const ttsRouter = createTRPCRouter({
  getCacheStatus: publicProcedure
    .input(
      z.object({
        devotionalId: z.string(),
      })
    )
    .query(({ input }) => {
      const status = getCacheStatus(input.devotionalId);
      return status;
    }),
});
