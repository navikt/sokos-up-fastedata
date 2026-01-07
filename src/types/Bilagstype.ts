import type { z } from "zod";
import type { BilagstypeSchema } from "./schema/BilagstypeSchema";

export type Bilagstype = z.infer<typeof BilagstypeSchema>;
