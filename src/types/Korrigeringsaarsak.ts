import type { z } from "zod";
import type { KorrigeringsaarsakSchema } from "./schema/KorrigeringsaarsakSchema";

export type Korrigeringsaarsak = z.infer<typeof KorrigeringsaarsakSchema>;
