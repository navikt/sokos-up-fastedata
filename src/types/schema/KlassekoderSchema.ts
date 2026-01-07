import { z } from "zod";

export const KlassekoderSchema = z.object({
	kodeKlasse: z.string(),
	kodeFagomraade: z.string().optional(),
	artID: z.number(),
	datoFom: z.string(),
	datoTom: z.string(),
	hovedkontoNr: z.string(),
	underkontoNr: z.string().optional(),
	beskrKlasse: z.string(),
	beskrArt: z.string().optional(),
	underkontoNavn: z.string().optional(),
	hovedkontoNavn: z.string().optional(),
});

export const KlassekoderListeSchema = z.array(KlassekoderSchema);
