type PaletteLevel = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type PaletteType = "main" | "light" | "dark" | "contrastText";

type TextPalette = "primary" | "secondary" | "disabled" | "icon";

type PaletteAccent = "A100" | "A200" | "A400" | "A700";

type ColorObject<T extends string | number | symbol> = { [key in T]: string };

type Colors = {
  black: string;
  white: string;
  red: ColorObject<PaletteLevel | PaletteAccent>;
  pink: ColorObject<PaletteLevel | PaletteAccent>;
  purple: ColorObject<PaletteLevel | PaletteAccent>;
  "deep-purple": ColorObject<PaletteLevel | PaletteAccent>;
  indigo: ColorObject<PaletteLevel | PaletteAccent>;
  blue: ColorObject<PaletteLevel | PaletteAccent>;
  "light-blue": ColorObject<PaletteLevel | PaletteAccent>;
  cyan: ColorObject<PaletteLevel | PaletteAccent>;
  teal: ColorObject<PaletteLevel | PaletteAccent>;
  green: ColorObject<PaletteLevel | PaletteAccent>;
  "light-green": ColorObject<PaletteLevel | PaletteAccent>;
  lime: ColorObject<PaletteLevel | PaletteAccent>;
  yellow: ColorObject<PaletteLevel | PaletteAccent>;
  amber: ColorObject<PaletteLevel | PaletteAccent>;
  orange: ColorObject<PaletteLevel | PaletteAccent>;
  "deep-orange": ColorObject<PaletteLevel | PaletteAccent>;
  brown: ColorObject<PaletteLevel>;
  gray: ColorObject<PaletteLevel>;
  "blue-gray": ColorObject<PaletteLevel>;
};

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
