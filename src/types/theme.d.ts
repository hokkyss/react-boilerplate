type DefaultCssVarsTheme =
  import("@mui/system/cssVars/prepareCssVars").DefaultCssVarsTheme;
type Typography = import("./font").Typography;
type Theme = import("@mui/system/createTheme").Theme;
type ThemeOptions = import("@mui/system/createTheme").ThemeOptions;

declare interface CustomTheme extends Theme {
  palette: Palette;
  shadows: string[];
  typography: Typography;
}

declare interface CustomThemeOptions extends ThemeOptions {
  palette: Palette;
  shadows?: string[];
  typography?: Typography;
}

type ColorSchemes = {
  light: CustomTheme;
  dark: CustomTheme;
};

type PrepareCSSVars<
  T extends DefaultCssVarsTheme,
  ThemeVars extends Record<string, unknown>
> = typeof import("@mui/system/cssVars/prepareCssVars").default<T, ThemeVars>;

declare type ITheme = CustomTheme & {
  colorSchemes: ColorSchemes;
  palette: {
    colorScheme: PaletteMode;
  } & Palette;
  vars: ReturnType<
    PrepareCSSVars<{ colorSchemes: ColorSchemes }, CustomTheme>
  >["vars"];
  generateCssVars: ReturnType<
    PrepareCSSVars<{ colorSchemes: ColorSchemes }, CustomTheme>
  >["generateCssVars"];
};
