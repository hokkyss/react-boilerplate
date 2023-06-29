import { CacheProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Theme from "./components/contexts/Theme/Theme.context";
import emotionCache from "./configs/emotion/emotion.config";
import routerConfig from "./configs/router/router.config";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CacheProvider value={emotionCache}>
      <Theme>
        <RouterProvider router={routerConfig} />
      </Theme>
    </CacheProvider>
  </React.StrictMode>
);
