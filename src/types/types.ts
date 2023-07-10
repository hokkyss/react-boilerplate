import { FC } from "react";

export type PropType<T> = T extends FC<infer U> ? Omit<U, "ref"> : never;
