import type { z } from "zod";
import type { RedusertSkattSchema } from "./schema/RedusertSkattSchema";

export type RedusertSkatt = z.infer<typeof RedusertSkattSchema>;
