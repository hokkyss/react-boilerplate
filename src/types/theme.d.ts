type Font = import("./font").Font;
type Typography = import("./font").Typography;
type Theme = import("@mui/system/createTheme").Theme;
type ThemeOptions = import("@mui/system/createTheme").ThemeOptions;

declare interface ITheme extends Theme {
  palette: Palette;
  shadows: string[];
  typography: Typography;
}

declare interface IThemeOptions extends ThemeOptions {
  palette: Palette;
  shadows?: string[];
  typography?: Typography;
}
