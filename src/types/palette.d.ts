type PaletteLevel = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type PaletteMode = "light" | "dark";

type PaletteType = "main" | "light" | "dark" | "contrastText";

type TextPalette = "primary" | "secondary" | "disabled" | "icon";

type PaletteAccent = "A100" | "A200" | "A400" | "A700";

type ColorObject<T extends string | number | symbol> = { [key in T]: string };

declare type Palette = {
  mode: "dark" | "light";
  common: {
    black: string;
    white: string;
  };
  background: {
    paper: string;
    default: string;
  };
  primary: { [key in PaletteType]: string };
  secondary: { [key in PaletteType]: string };
  error: { [key in PaletteType]: string };
  warning: { [key in PaletteType]: string };
  info: { [key in PaletteType]: string };
  success: { [key in PaletteType]: string };
  grey: { [key in PaletteLevel | PaletteAccent]: string };
  contrastThreshold: number;
  tonalOffset: number;
  text: { [key in TextPalette]: string };
  action: {
    active: string;
    hover: string;
    hoverOpacity: number;
    selected: string;
    selectedOpacity: number;
    disabled: string;
    disabledBackground: string;
    disabledOpacity: number;
    focus: string;
    focusOpacity: number;
    activatedOpacity: number;
  };
};
