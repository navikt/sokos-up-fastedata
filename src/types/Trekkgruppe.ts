import type { z } from "zod";
import type { TrekkgruppeSchema } from "./schema/TrekkgruppeSchema";

export type Trekkgruppe = z.infer<typeof TrekkgruppeSchema>;
