import { CacheProvider } from "@emotion/react";
import ThemeProvider from "@mui/system/ThemeProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/templates/ErrorBoundary/ErrorBoundary.template";
import emotionCache from "./configs/emotion/emotion.config";
import routerConfig from "./configs/router/router.config";
import theme from "./configs/theme/theme.config";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <RouterProvider router={routerConfig} />
        </ErrorBoundary>
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
