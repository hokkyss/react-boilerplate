import type { Theme, ThemeOptions } from "@mui/system/createTheme";
import type prepareCssVars from "@mui/system/cssVars/prepareCssVars";
import type { DefaultCssVarsTheme } from "@mui/system/cssVars/prepareCssVars";
import type { CSSProperties } from "react";

import type { Colors, Palette } from "./palette.type";
import type { Typography } from "./typography.type";

type ZIndexTypes =
  | "appBar"
  | "drawer"
  | "fab"
  | "mobileStepper"
  | "modal"
  | "snackbar"
  | "speedDial"
  | "tooltip";

interface CustomTheme extends Theme {
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

interface CustomThemeOptions extends ThemeOptions {
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

type PaletteMode = keyof ColorSchemes;

type PrepareCSSVars<
  T extends DefaultCssVarsTheme,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ThemeVars extends Record<string, any>
> = typeof prepareCssVars<T, ThemeVars>;

export type ITheme = CustomTheme & {
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
