import { CSSProperties } from "react";

declare type Font = {
  fontFamily: NonNullable<CSSProperties["fontFamily"]>;
  fontWeight: NonNullable<CSSProperties["fontWeight"]>;
  fontSize: NonNullable<CSSProperties["fontSize"]>;
  lineHeight: NonNullable<CSSProperties["lineHeight"]>;
  letterSpacing: NonNullable<CSSProperties["letterSpacing"]>;
  textTransform?: NonNullable<CSSProperties["textTransform"]>;
};

type Typography = {
  htmlFontSize: number;
  fontFamily: string;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: Font;
  h2: Font;
  h3: Font;
  h4: Font;
  h5: Font;
  h6: Font;
  subtitle1: Font;
  subtitle2: Font;
  body1: Font;
  body2: Font;
  button: Required<Font>;
  caption: Font;
  overline: Required<Font>;
  inherit: Font;
};
