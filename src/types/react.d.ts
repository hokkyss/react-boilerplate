/// <reference types="react" />

type SxProps<Theme extends object> =
  import("@mui/system/styleFunctionSx").SxProps<Theme>;

type Props<T> = T & { className?: string; sx?: SxProps<ITheme> };

declare namespace React {}
