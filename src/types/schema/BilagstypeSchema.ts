import { z } from "zod";

export const BilagstypeSchema = z.object({
  kodeFagomraade: z.string(),
  typeBilag: z.string(),
  datoFom: z.string(), // Consider z.coerce.date() if you want to convert it to Date automatically
  autoFagsystemId: z.string(),
});

export const BilagstyperListeSchema = z.array(BilagstypeSchema);
