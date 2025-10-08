import { z } from "zod";
import { KjoreplanSchema } from "./schema/KjoreplanSchema";

export type Kjoreplan = z.infer<typeof KjoreplanSchema>;
