import { z } from "zod";

export const TrekkgruppeSchema = z.object({
	kodeTrekkgruppe: z.string(),
	kodeFagomraade: z.string(),
});

export const TrekkgrupperListeSchema = z.array(TrekkgruppeSchema);
