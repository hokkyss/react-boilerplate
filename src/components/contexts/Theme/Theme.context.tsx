import { ThemeProvider } from "@mui/system";
import noop from "lodash/noop";
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useMemo,
  useState,
} from "react";
import themeConfig from "~/configs/theme/theme.config";

const ColorModeContext = createContext<{ toggleColorMode: () => void }>({
  toggleColorMode: noop,
});

const Theme: FunctionComponent<PropsWithChildren> = function Theme({
  children,
}) {
  const [mode, setMode] = useState<PaletteMode>("light");

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => themeConfig[mode], [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={themeConfig.common}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Theme;
