import prepareCssVars from "@mui/system/cssVars/prepareCssVars";
import envConfig from "~/configs/env/env.config";
import themeConfig, { commonTheme } from "~/configs/theme/theme.config";

function extendTheme() {
  const { vars: themeVars, generateCssVars } = prepareCssVars<
    {
      colorSchemes: ColorSchemes;
    },
    ITheme
  >(
    {
      colorSchemes: {
        light: themeConfig.light,
        dark: themeConfig.dark,
      },
    },
    {
      prefix: envConfig.cssPrefix,
      shouldSkipGeneratingVar: () => false,
    }
  );

  const theme: ITheme = {
    colorSchemes: {
      light: themeConfig.light,
      dark: themeConfig.dark,
    },
    ...commonTheme,
    vars: themeVars,
    generateCssVars,
    palette: {
      ...themeConfig.light.palette,
      colorScheme: "light",
    },
  };

  return theme;
}

export default extendTheme;
