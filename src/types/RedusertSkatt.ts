import { z } from "zod";
import { RedusertSkattSchema } from "./schema/RedusertSkattSchema";

export type RedusertSkatt = z.infer<typeof RedusertSkattSchema>;
