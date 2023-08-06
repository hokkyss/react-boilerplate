import { type FunctionComponent } from "react";

export type PropType<T> = T extends FunctionComponent<infer U>
  ? Omit<U, "ref">
  : never;
