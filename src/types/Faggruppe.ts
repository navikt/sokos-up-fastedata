import type { z } from "zod";
import type { FaggruppeSchema } from "./schema/FaggruppeSchema";

export type Faggruppe = z.infer<typeof FaggruppeSchema>;
