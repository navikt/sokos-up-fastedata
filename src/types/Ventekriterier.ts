import type { z } from "zod";
import type { VentekriterierSchema } from "./schema/VentekriterierSchema";

export type Ventekriterier = z.infer<typeof VentekriterierSchema>;
