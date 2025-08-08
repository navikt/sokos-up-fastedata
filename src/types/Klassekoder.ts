import { z } from "zod";
import { KlassekoderSchema } from "./schema/KlassekoderSchema";

export type Klassekoder = z.infer<typeof KlassekoderSchema>;
