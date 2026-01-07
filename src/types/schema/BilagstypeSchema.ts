import { z } from "zod";

export const BilagstypeSchema = z.object({
	kodeFagomraade: z.string(),
	typeBilag: z.string(),
	datoFom: z.string(),
});

export const BilagstyperListeSchema = z.array(BilagstypeSchema);
