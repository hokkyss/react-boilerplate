import createCssVarsProvider from "@mui/system/cssVars/createCssVarsProvider";
import prepareCssVars from "@mui/system/cssVars/prepareCssVars";
import constant from "lodash/constant";

import envConfig from "~/configs/env/env.config";
import themeConfig, { commonTheme } from "~/configs/theme/theme.config";

function extendTheme(
  cssPrefix: string,
  colorSchemes: ColorSchemes,
  common: CustomTheme
) {
  const { generateCssVars, vars: themeVars } = prepareCssVars<
    {
      colorSchemes: ColorSchemes;
    },
    ITheme
  >(
    {
      colorSchemes,
    },
    {
      prefix: cssPrefix,
      shouldSkipGeneratingVar: constant(false),
    }
  );

  const theme: ITheme = {
    colorSchemes,
    ...common,
    generateCssVars,
    palette: {
      ...colorSchemes.light.palette,
      colorScheme: "light",
    },
    vars: themeVars,
  };

  return theme;
}

const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
  attribute: `${envConfig.cssPrefix}-color-scheme`,
  defaultColorScheme: {
    dark: "dark",
    light: "light",
  },
  modeStorageKey: `${envConfig.cssPrefix}-key`,
  theme: extendTheme(envConfig.cssPrefix, themeConfig, commonTheme),
});

export { useColorScheme };
export default CssVarsProvider;
