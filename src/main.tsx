import { CacheProvider } from "@emotion/react";
import ThemeProvider from "@mui/system/ThemeProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import ContainerTemplate from "./components/templates/Container/Container.template";
import emotionCache from "./configs/emotion/emotion.config";
import theme from "./configs/theme/theme.config";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <ContainerTemplate />
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
