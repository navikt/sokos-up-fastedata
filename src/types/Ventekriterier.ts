import { z } from "zod";
import { VentekriterierSchema } from "./schema/VentekriterierSchema";

export type Ventekriterier = z.infer<typeof VentekriterierSchema>;
