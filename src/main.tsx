import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppContext from "./components/templates/AppContext/AppContext.template";
import Container from "./components/templates/Container/Container.template";
import envConfig from "./configs/env/env.config";
import routerConfig from "./configs/router/router.config";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement, {
  identifierPrefix: envConfig.identifierPrefix,
}).render(
  <React.StrictMode>
    <Profiler
      // React Profiler is active only in development.
      onRender={(id, phase, actualDuration, baseDuration, startTime, endTime) =>
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
        <Container>
          <RouterProvider router={routerConfig} />
        </Container>
      </AppContext>
    </Profiler>
  </React.StrictMode>
);
