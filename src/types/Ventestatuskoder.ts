import { z } from "zod";
import { VentestatuskoderSchema } from "./schema/VentestatuskoderSchema";

export type Ventestatuskoder = z.infer<typeof VentestatuskoderSchema>;
