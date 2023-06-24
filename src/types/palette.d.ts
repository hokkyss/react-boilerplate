type ColorNames =
  | "red"
  | "pink"
  | "purple"
  | "deep-purple"
  | "indigo"
  | "blue"
  | "light-blue"
  | "cyan"
  | "teal"
  | "green"
  | "light-green"
  | "lime"
  | "yellow"
  | "amber"
  | "orange"
  | "deep-orange"
  | "brown"
  | "gray"
  | "blue-gray";

type PaletteLevel = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

declare type Palette = {
  [key in ColorNames]: string;
} & {
  [key in ColorNames as `${key}.${PaletteLevel}`]: string;
};
