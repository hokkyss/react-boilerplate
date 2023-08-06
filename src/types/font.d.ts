import type { CSSProperties } from "react";

declare type Font = {
  fontFamily: NonNullable<CSSProperties["fontFamily"]>;
  fontSize: NonNullable<CSSProperties["fontSize"]>;
  fontWeight: NonNullable<CSSProperties["fontWeight"]>;
  letterSpacing: NonNullable<CSSProperties["letterSpacing"]>;
  lineHeight: NonNullable<CSSProperties["lineHeight"]>;
  textTransform?: NonNullable<CSSProperties["textTransform"]>;
};

type Typography = {
  body1: Font;
  body2: Font;
  button: Required<Font>;
  caption: Font;
  fontFamily: string;
  fontSize: number;
  fontWeightBold: number;
  fontWeightLight: number;
  fontWeightMedium: number;
  fontWeightRegular: number;
  h1: Font;
  h2: Font;
  h3: Font;
  h4: Font;
  h5: Font;
  h6: Font;
  htmlFontSize: number;
  inherit: Font;
  overline: Required<Font>;
  subtitle1: Font;
  subtitle2: Font;
};
