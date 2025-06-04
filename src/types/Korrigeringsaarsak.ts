import { z } from "zod";
import { KorrigeringsaarsakSchema } from "./schema/KorrigeringsaarsakSchema";

export type Korrigeringsaarsak = z.infer<typeof KorrigeringsaarsakSchema>;
