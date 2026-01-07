import type { z } from "zod";
import type { KlassekoderSchema } from "./schema/KlassekoderSchema";

export type Klassekoder = z.infer<typeof KlassekoderSchema>;
