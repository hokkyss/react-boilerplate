import createCssVarsProvider from "@mui/system/cssVars/createCssVarsProvider";
import envConfig from "~/configs/env/env.config";
import extendTheme from "~/utils/theme.util";

const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
  theme: extendTheme(),
  modeStorageKey: `${envConfig.cssPrefix}-key`,
  attribute: `${envConfig.cssPrefix}-color-scheme`,
  defaultColorScheme: {
    light: "light",
    dark: "dark",
  },
});

export { useColorScheme };
export default CssVarsProvider;
