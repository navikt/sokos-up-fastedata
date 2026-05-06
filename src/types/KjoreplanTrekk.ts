import type { z } from "zod";
import type { KjoreplanTrekkSchema } from "./schema/KjoreplanTrekkSchema";

export type KjoreplanTrekk = z.infer<typeof KjoreplanTrekkSchema>;
