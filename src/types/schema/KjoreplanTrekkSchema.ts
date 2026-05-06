import { z } from "zod";

export const KjoreplanTrekkSchema = z.object({
	kodeOppgjorstype: z.string(),
	datoKjores: z.string(),
	status: z.string(),
	datoPeriodeFom: z.string(),
	datoPeriodeTom: z.string(),
});

export const KjoreplanTrekkListeSchema = z.array(KjoreplanTrekkSchema);
