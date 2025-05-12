import { z } from "zod";

export const VentestatuskoderSchema = z.object({
  kodeVentestatus: z.string(),
  beskrivelse: z.string(),
  prioritet: z.number(),
  settesManuelt: z.string(),
  kodeArvesTil: z.string(),
  kanManueltEndresTil: z.string(),
});

export const VentestatuskoderListeSchema = z.array(VentestatuskoderSchema);
