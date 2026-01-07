import type { z } from "zod";
import type { KjoreplanSchema } from "./schema/KjoreplanSchema";

export type Kjoreplan = z.infer<typeof KjoreplanSchema>;
