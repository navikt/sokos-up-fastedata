import { z } from "zod";
import { BilagstypeSchema } from "./schema/BilagstypeSchema";

export type Bilagstype = z.infer<typeof BilagstypeSchema>;
