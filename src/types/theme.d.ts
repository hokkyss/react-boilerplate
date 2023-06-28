type Theme = import("@mui/system/createTheme").Theme;
type ThemeOptions = import("@mui/system/createTheme").ThemeOptions;

declare interface ITheme extends Theme {
  palette: Palette;
  shadows: string[];
}

declare interface IThemeOptions extends ThemeOptions {
  palette: Palette;
}
