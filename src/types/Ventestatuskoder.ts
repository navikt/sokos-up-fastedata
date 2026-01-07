import type { z } from "zod";
import type { VentestatuskoderSchema } from "./schema/VentestatuskoderSchema";

export type Ventestatuskoder = z.infer<typeof VentestatuskoderSchema>;
