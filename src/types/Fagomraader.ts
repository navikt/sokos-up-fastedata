import { z } from "zod";
import { FagomraaderSchema } from "./schema/FagomraaderSchema";

export type Fagomraader = z.infer<typeof FagomraaderSchema>;
