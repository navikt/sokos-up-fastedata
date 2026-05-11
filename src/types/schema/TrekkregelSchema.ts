import { z } from "zod";

export const TrekkregelSchema = z.object({
	kodeTrekktype: z.string(),
	beskrivelse: z.string(),
	prioritet: z.number(),
	reduserSkattegr: z.string(),
	kodeKlasseTrekk: z.string(),
	typeTrekkberegning: z.string().nullable(),
	fagomraader: z.array(z.string()),
	antDagerOppf: z.number().nullable(),
	antDagerOppfUtf: z.number().nullable(),
	belopsgrense: z.number(),
	oppfolging: z.string(),
	kodeBehandling: z.string(),
	kodeOppgjorstype: z.string(),
	kodeOppgjorstypeNeg: z.string(),
	brukerId: z.string(),
	antallKjoreplaner: z.number(),
});

export const TrekkregelListeSchema = z.array(TrekkregelSchema);
