import createCssVarsProvider from "@mui/system/cssVars/createCssVarsProvider";
import extendTheme from "~/utils/theme.util";

const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
  theme: extendTheme(),
  modeStorageKey: "boilerplate-mode",
  attribute: "data-boilerplate-color-scheme",
  defaultColorScheme: {
    light: "light",
    dark: "dark",
  },
});

export { useColorScheme };
export default CssVarsProvider;
