import { CacheProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { LazyMotion } from "framer-motion";
import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import CssVarsProvider from "./components/contexts/Theme/Theme.context";
import emotionCache from "./configs/emotion/emotion.config";
import envConfig from "./configs/env/env.config";
import queryClient from "./configs/react-query/react-query.config";
import routerConfig from "./configs/router/router.config";
import "./index.css";

const framerMotion = () =>
  import("~/configs/framer-motion/framer-motion.config").then(
    (mod) => mod.default
  );

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
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <CssVarsProvider>
            <LazyMotion strict features={framerMotion}>
              <RouterProvider router={routerConfig} />
            </LazyMotion>
          </CssVarsProvider>
        </CacheProvider>
      </QueryClientProvider>
    </Profiler>
  </React.StrictMode>
);
