import type { z } from "zod";
import type { FagomraaderSchema } from "./schema/FagomraaderSchema";

export type Fagomraader = z.infer<typeof FagomraaderSchema>;
