import { z } from "zod";

export const KorrigeringsaarsakSchema = z.object({
  kodeAarsakKorr: z.string(),
  beskrivelse: z.string(),
  medforerKorr: z.boolean(),
});

export const KorrigeringsaarsakerListeSchema = z.array(
  KorrigeringsaarsakSchema,
);
