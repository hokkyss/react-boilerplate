import type { SxProps } from "@mui/system/styleFunctionSx";
import type { FunctionComponent } from "react";

import type { ITheme } from "~/configs/theme/theme.type";

export type PropType<T> = T extends FunctionComponent<infer U>
  ? Omit<U, "ref">
  : never;

export type Sx = SxProps<ITheme>;

export type WithMui<T> = T & { className?: string; sx?: Sx };
