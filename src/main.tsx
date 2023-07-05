import { CacheProvider } from "@emotion/react";
import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import CssVarsProvider from "./components/contexts/Theme/Theme.context";
import emotionCache from "./configs/emotion/emotion.config";
import envConfig from "./configs/env/env.config";
import routerConfig from "./configs/router/router.config";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement, {
  identifierPrefix: envConfig.identifierPrefix,
}).render(
  <React.StrictMode>
    <Profiler
      id="app-profiler"
      // React Profiler is active only in development.
      // eslint-disable-next-line no-console
      onRender={(id, ...args) => console.debug(`[${id}]`, ...args)}
    >
      <CacheProvider value={emotionCache}>
        <CssVarsProvider>
          <RouterProvider router={routerConfig} />
        </CssVarsProvider>
      </CacheProvider>
    </Profiler>
  </React.StrictMode>
);
