type CSSProperties = import("react").CSSProperties;
type DefaultCssVarsTheme =
  import("@mui/system/cssVars/prepareCssVars").DefaultCssVarsTheme;
type Typography = import("./font").Typography;
type Theme = import("@mui/system/createTheme").Theme;
type ThemeOptions = import("@mui/system/createTheme").ThemeOptions;

type ZIndexTypes =
  | "appBar"
  | "drawer"
  | "fab"
  | "mobileStepper"
  | "modal"
  | "snackbar"
  | "speedDial"
  | "tooltip";

declare interface CustomTheme extends Theme {
  colors: Colors;
  palette: Palette;
  radius: {
    full: NonNullable<CSSProperties["borderRadius"]>;
    lg: NonNullable<CSSProperties["borderRadius"]>;
    md: NonNullable<CSSProperties["borderRadius"]>;
    none: NonNullable<CSSProperties["borderRadius"]>;
    sm: NonNullable<CSSProperties["borderRadius"]>;
    xl: NonNullable<CSSProperties["borderRadius"]>;
  };
  shadows: string[];
  transitions: NonNullable<CustomThemeOptions["transitions"]>;
  typography: Typography;
  zIndex: Record<ZIndexTypes, number>;
}

declare interface CustomThemeOptions extends ThemeOptions {
  colors: Colors;
  palette?: Palette;
  radius: {
    full: NonNullable<CSSProperties["borderRadius"]>;
    lg: NonNullable<CSSProperties["borderRadius"]>;
    md: NonNullable<CSSProperties["borderRadius"]>;
    none: NonNullable<CSSProperties["borderRadius"]>;
    sm: NonNullable<CSSProperties["borderRadius"]>;
  };
  shadows?: string[];
  transitions?: {
    duration: {
      complex: number;
      enteringScreen: number;
      leavingScreen: number;
      short: number;
      shorter: number;
      shortest: number;
      standard: number;
    };
    easing: {
      easeIn: string;
      easeInOut: string;
      easeOut: string;
      sharp: string;
    };
  };
  typography?: Typography;
  zIndex?: Record<ZIndexTypes, number>;
}

type ColorSchemes = {
  dark: CustomTheme;
  light: CustomTheme;
};

type PrepareCSSVars<
  T extends DefaultCssVarsTheme,
  ThemeVars extends Record<string, unknown>
> = typeof import("@mui/system/cssVars/prepareCssVars").default<T, ThemeVars>;

declare type ITheme = CustomTheme & {
  colorSchemes: ColorSchemes;
  generateCssVars: ReturnType<
    PrepareCSSVars<{ colorSchemes: ColorSchemes }, CustomTheme>
  >["generateCssVars"];
  palette: {
    colorScheme: PaletteMode;
  } & Palette;
  vars: ReturnType<
    PrepareCSSVars<{ colorSchemes: ColorSchemes }, CustomTheme>
  >["vars"];
};

declare module "@mui/system/useTheme" {
  export default function useTheme<T = ITheme>(defaultTheme?: T): T;
}
