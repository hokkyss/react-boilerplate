type PaletteLevel = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type PaletteType = "contrastText" | "dark" | "light" | "main";

type TextPalette = "disabled" | "icon" | "primary" | "secondary";

type PaletteAccent = "A100" | "A200" | "A400" | "A700";

type ColorObject<T extends number | string | symbol> = { [key in T]: string };

type Colors = {
  amber: ColorObject<PaletteAccent | PaletteLevel>;
  black: string;
  blue: ColorObject<PaletteAccent | PaletteLevel>;
  "blue-gray": ColorObject<PaletteLevel>;
  brown: ColorObject<PaletteLevel>;
  cyan: ColorObject<PaletteAccent | PaletteLevel>;
  "deep-orange": ColorObject<PaletteAccent | PaletteLevel>;
  "deep-purple": ColorObject<PaletteAccent | PaletteLevel>;
  gray: ColorObject<PaletteLevel>;
  green: ColorObject<PaletteAccent | PaletteLevel>;
  indigo: ColorObject<PaletteAccent | PaletteLevel>;
  "light-blue": ColorObject<PaletteAccent | PaletteLevel>;
  "light-green": ColorObject<PaletteAccent | PaletteLevel>;
  lime: ColorObject<PaletteAccent | PaletteLevel>;
  orange: ColorObject<PaletteAccent | PaletteLevel>;
  pink: ColorObject<PaletteAccent | PaletteLevel>;
  purple: ColorObject<PaletteAccent | PaletteLevel>;
  red: ColorObject<PaletteAccent | PaletteLevel>;
  teal: ColorObject<PaletteAccent | PaletteLevel>;
  white: string;
  yellow: ColorObject<PaletteAccent | PaletteLevel>;
};

declare type Palette = {
  action: {
    activatedOpacity: number;
    active: string;
    disabled: string;
    disabledBackground: string;
    disabledOpacity: number;
    focus: string;
    focusOpacity: number;
    hover: string;
    hoverOpacity: number;
    selected: string;
    selectedOpacity: number;
  };
  background: {
    default: string;
    paper: string;
  };
  common: {
    black: string;
    white: string;
  };
  contrastThreshold: number;
  error: { [key in PaletteType]: string };
  grey: { [key in PaletteAccent | PaletteLevel]: string };
  info: { [key in PaletteType]: string };
  mode: "dark" | "light";
  primary: { [key in PaletteType]: string };
  secondary: { [key in PaletteType]: string };
  success: { [key in PaletteType]: string };
  text: { [key in TextPalette]: string };
  tonalOffset: number;
  warning: { [key in PaletteType]: string };
};
