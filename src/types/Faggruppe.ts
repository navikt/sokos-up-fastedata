import { z } from "zod";
import { FaggruppeSchema } from "./schema/FaggruppeSchema";

export type Faggruppe = z.infer<typeof FaggruppeSchema>;
