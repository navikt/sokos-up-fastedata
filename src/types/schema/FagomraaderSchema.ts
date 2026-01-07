import { z } from "zod";

export const FagomraaderSchema = z.object({
	antAttestanter: z.number(),
	anviser: z.string(),
	bilagstypeFinnes: z.boolean(),
	klassekodeFinnes: z.boolean(),
	kodeFagomraade: z.string(),
	kodeFaggruppe: z.string(),
	korraarsakFinnes: z.boolean(),
	kodeMotregningsgruppe: z.string(),
	maksAktOppdrag: z.number(),
	navnFagomraade: z.string(),
	regelFinnes: z.boolean(),
	sjekkMotTps: z.string(),
	sjekkOffId: z.string(),
	tpsDistribusjon: z.string(),
});

export const FagomraaderListeSchema = z.array(FagomraaderSchema);
