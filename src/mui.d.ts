declare module "@mui/system/styled" {
  import type { CreateMUIStyled } from "@mui/styled-engine";
  import type { MUIStyledCommonProps, MuiStyledOptions } from "@mui/system";

  import type { ITheme } from "~/configs/theme/theme.type";

  const styled: CreateMUIStyled<
    MUIStyledCommonProps<ITheme>,
    MuiStyledOptions,
    ITheme
  >;

  export default styled;
}

declare module "@mui/system/useTheme" {
  import type { ITheme } from "~/configs/theme/theme.type";

  export default function useTheme<T = ITheme>(defaultTheme?: T): T;
}
