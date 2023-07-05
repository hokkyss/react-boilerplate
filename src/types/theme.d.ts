type DefaultCssVarsTheme =
  import("@mui/system/cssVars/prepareCssVars").DefaultCssVarsTheme;
type Typography = import("./font").Typography;
type Theme = import("@mui/system/createTheme").Theme;
type ThemeOptions = import("@mui/system/createTheme").ThemeOptions;

type ZIndexTypes =
  | "mobileStepper"
  | "fab"
  | "speedDial"
  | "appBar"
  | "drawer"
  | "modal"
  | "snackbar"
  | "tooltip";

declare interface CustomTheme extends Theme {
  radius: {
    none: NonNullable<CSSProperties["borderRadius"]>;
    sm: NonNullable<CSSProperties["borderRadius"]>;
    md: NonNullable<CSSProperties["borderRadius"]>;
    lg: NonNullable<CSSProperties["borderRadius"]>;
    full: NonNullable<CSSProperties["borderRadius"]>;
  };
  palette: Palette;
  shadows: string[];
  typography: Typography;
  zIndex: Record<ZIndexTypes, number>;
  transitions: NonNullable<CustomThemeOptions["transitions"]>;
}

declare interface CustomThemeOptions extends ThemeOptions {
  radius: {
    none: NonNullable<CSSProperties["borderRadius"]>;
    sm: NonNullable<CSSProperties["borderRadius"]>;
    md: NonNullable<CSSProperties["borderRadius"]>;
    lg: NonNullable<CSSProperties["borderRadius"]>;
    full: NonNullable<CSSProperties["borderRadius"]>;
  };
  palette?: Palette;
  shadows?: string[];
  typography?: Typography;
  zIndex?: Record<ZIndexTypes, number>;
  transitions?: {
    easing: {
      easeInOut: string;
      easeOut: string;
      easeIn: string;
      sharp: string;
    };
    duration: {
      shortest: number;
      shorter: number;
      short: number;
      standard: number;
      complex: number;
      enteringScreen: number;
      leavingScreen: number;
    };
  };
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

declare module "@mui/system/useTheme" {
  export default function useTheme<T = ITheme>(defaultTheme?: T): T;
}
