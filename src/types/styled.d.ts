declare module "@mui/system/styled" {
  import { CreateMUIStyled } from "@mui/styled-engine";
  import { MUIStyledCommonProps, MuiStyledOptions } from "@mui/system";

  const styled: CreateMUIStyled<
    MUIStyledCommonProps<ITheme>,
    MuiStyledOptions,
    ITheme
  >;

  export default styled;
}
