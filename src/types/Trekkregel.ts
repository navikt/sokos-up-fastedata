import type { z } from "zod";
import type { TrekkregelSchema } from "./schema/TrekkregelSchema";

export type Trekkregel = z.infer<typeof TrekkregelSchema>;
