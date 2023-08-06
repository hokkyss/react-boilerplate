declare module "@mui/system/styled" {
  import { type CreateMUIStyled } from "@mui/styled-engine";
  import {
    type MUIStyledCommonProps,
    type MuiStyledOptions,
  } from "@mui/system";

  const styled: CreateMUIStyled<
    MUIStyledCommonProps<ITheme>,
    MuiStyledOptions,
    ITheme
  >;

  export default styled;
}
