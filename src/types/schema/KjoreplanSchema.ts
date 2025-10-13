import { z } from "zod";

export const KjoreplanSchema = z.object({
  kodeFaggruppe: z.string(),
  datoKjores: z.string(),
  status: z.string(),
  datoForfall: z.string(),
  datoOverfores: z.string().optional(),
  datoBeregnFom: z.string(),
  datoBeregnTom: z.string(),
});
