import { type z } from "zod";

declare type InferParams<T extends Record<string, z.ZodType>> = {
  [key in keyof T]: z.infer<T[key]>;
};
