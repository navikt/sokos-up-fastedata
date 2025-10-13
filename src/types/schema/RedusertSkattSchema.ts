import { z } from "zod";

export const RedusertSkattSchema = z.object({
  kodeFaggruppe: z.string(),
  datoFom: z.coerce.date(),
  datoTom: z.coerce.date(),
  prosent: z.int(),
});
