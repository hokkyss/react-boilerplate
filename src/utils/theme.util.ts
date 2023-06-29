import prepareCssVars from "@mui/system/cssVars/prepareCssVars";
import envConfig from "~/configs/env/env.config";
import themeConfig, { commonTheme } from "~/configs/theme/theme.config";

// eslint-disable-next-line import/prefer-default-export
export const getTheme = (theme: Theme) => theme as unknown as ITheme;

function extendTheme() {
  const { vars: themeVars, generateCssVars } = prepareCssVars(
    {
      colorSchemes: {
        light: themeConfig.light,
        dark: themeConfig.dark,
      },
    },
    {
      prefix: envConfig.cssPrefix,
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
