import { z } from "zod";

export const FaggruppeSchema = z.object({
	destinasjon: z.string(),
	klassekodeFeil: z.string(),
	klassekodeJustering: z.string(),
	klassekodeMotpFeil: z.string(),
	klassekodeMotpInnkr: z.string(),
	klassekodeMotpTrekk: z.string(),
	kodeFaggruppe: z.string(),
	navnFaggruppe: z.string(),
	oereavrunding: z.boolean(),
	onlineBeregning: z.boolean(),
	pensjon: z.boolean(),
	prioritet: z.number(),
	reskontroOppdrag: z.string(),
	samordnetBeregning: z.string(),
	skatteprosent: z.number(),
	ventedager: z.number(),
	antallFagomraader: z.number(),
	antallRedusertSkatt: z.number(),
	antallKjoreplaner: z.number(),
	nesteKjoredato: z.string().optional(),
});
