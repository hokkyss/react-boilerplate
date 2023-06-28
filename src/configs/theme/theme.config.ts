import createTheme from "@mui/system/createTheme";
import { opacify } from "polished";
import colors from "~/constants/color.constant";

const commonTheme = createTheme({
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
    "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
    "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
    "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
    "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
    "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
    "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
    "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
    "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
    "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
    "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
    "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
    "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
    "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
    "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
    "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
    "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
    "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
    "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
  ],
});

// https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    common: {
      black: colors.black,
      white: colors.white,
    },
    primary: {
      main: colors.blue[200],
      light: colors.blue[50],
      dark: colors.blue[400],
      contrastText: opacify(0.87, colors.black),
    },
    secondary: {
      main: colors.purple[200],
      light: colors.purple[50],
      dark: colors.purple[400],
      contrastText: opacify(0.87, colors.black),
    },
    error: {
      main: colors.red[500],
      light: colors.red[300],
      dark: colors.red[700],
      contrastText: colors.white,
    },
    warning: {
      main: colors.orange[400],
      light: colors.orange[300],
      dark: colors.orange[700],
      contrastText: opacify(0.87, colors.black),
    },
    info: {
      main: colors["light-blue"][400],
      light: colors["light-blue"][300],
      dark: colors["light-blue"][700],
      contrastText: opacify(0.87, colors.black),
    },
    success: {
      main: colors.green[400],
      light: colors.green[300],
      dark: colors.green[700],
      contrastText: opacify(0.87, colors.black),
    },
    grey: {
      ...colors.gray,
      A100: colors.gray[100],
      A200: colors.gray[200],
      A400: colors.gray[400],
      A700: colors.gray[700],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: colors.white,
      secondary: opacify(0.7, colors.white),
      disabled: opacify(0.5, colors.white),
      icon: opacify(0.5, colors.white),
    },
    divider: opacify(0.12, colors.white),
    action: {
      active: colors.white,
      hover: opacify(0.08, colors.white),
      hoverOpacity: 0.08,
      selected: opacify(0.16, colors.white),
      selectedOpacity: 0.16,
      disabled: opacify(0.3, colors.white),
      disabledBackground: opacify(0.12, colors.white),
      disabledOpacity: 0.38,
      focus: opacify(0.12, colors.white),
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  },
} as IThemeOptions);

const lightTheme = createTheme({
  palette: {
    mode: "light",
    common: {
      black: colors.black,
      white: colors.white,
    },
    primary: {
      main: colors.blue[700],
      light: colors.blue[400],
      dark: colors.blue[800],
      contrastText: colors.white,
    },
    secondary: {
      main: colors.purple[500],
      light: colors.purple[300],
      dark: colors.purple[700],
      contrastText: colors.white,
    },
    error: {
      main: colors.red[700],
      light: colors.red[400],
      dark: colors.red[800],
      contrastText: colors.white,
    },
    warning: {
      // TODO: Add to color constants
      main: "#ED6C02",
      light: colors.orange[500],
      dark: colors.orange[900],
      contrastText: colors.white,
    },
    info: {
      main: colors["light-blue"][700],
      light: colors["light-blue"][500],
      dark: colors["light-blue"][900],
      contrastText: colors.white,
    },
    success: {
      main: colors.green[800],
      light: colors.green[500],
      dark: colors.green[900],
      contrastText: colors.white,
    },
    grey: {
      ...colors.gray,
      A100: colors.gray[100],
      A200: colors.gray[200],
      A400: colors.gray[400],
      A700: colors.gray[700],
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: opacify(0.87, colors.black),
      secondary: opacify(0.6, colors.black),
      disabled: opacify(0.38, colors.black),
      // DOES NOT EXIST IN MUI LIGHT THEME
      icon: opacify(0.38, colors.black),
    },
    divider: opacify(0.12, colors.black),
    action: {
      active: opacify(0.54, colors.black),
      hover: opacify(0.04, colors.black),
      hoverOpacity: 0.04,
      selected: opacify(0.08, colors.black),
      selectedOpacity: 0.08,
      disabled: opacify(0.26, colors.black),
      disabledBackground: opacify(0.12, colors.black),
      disabledOpacity: 0.38,
      focus: opacify(0.12, colors.black),
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
} as IThemeOptions);

const themeConfig = {
  common: commonTheme,
  dark: darkTheme,
  light: lightTheme,
};

export default themeConfig;
