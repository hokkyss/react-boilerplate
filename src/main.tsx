import "./index.css";

import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import AppContext from "./components/templates/app-context/app-context.template";
import envConfig from "./configs/env/env.config";
import routerConfig from "./configs/router/router.config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
  {
    identifierPrefix: envConfig.identifierPrefix,
  }
);

const deferRender = async () => {
  if (import.meta.env.DEV) {
    const axe = (await import("@axe-core/react")).default;
    await axe(React, ReactDOM, 1000);
  }
};

deferRender().then(() =>
  root.render(
    <React.StrictMode>
      <Profiler
        // React Profiler is active only in development.
        onRender={(
          id,
          phase,
          actualDuration,
          baseDuration,
          startTime,
          endTime
        ) =>
          // eslint-disable-next-line no-console
          console.debug(`[${id}:${phase}]`, {
            actualDuration,
            baseDuration,
            endTime,
            startTime,
          })
        }
        id="app-profiler"
      >
        <AppContext>
          <RouterProvider router={routerConfig} />
        </AppContext>
      </Profiler>
    </React.StrictMode>
  )
);
