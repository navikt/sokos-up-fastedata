import { z } from "zod";

export const VentekriterierSchema = z.object({
	kodeFaggruppe: z.string(),
	typeBilag: z.string(),
	datoFom: z.string(),
	belopBrutto: z.number().optional(),
	belopNetto: z.number().optional(),
	antDagerEldreenn: z.number().optional(),
	tidligereAar: z.boolean(),
});

export const VentekriterierListeSchema = z.array(VentekriterierSchema);
