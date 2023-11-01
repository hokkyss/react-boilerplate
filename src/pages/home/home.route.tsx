import type { RouteObject } from "react-router-dom";

import { Suspense, lazy } from "react";

import ErrorBoundary from "~/components/templates/error-boundary/error-boundary.template";

const HomeView = lazy(() => import("./home.page"));

const HomeRoute: RouteObject = {
  ErrorBoundary,
  element: (
    <Suspense fallback={<h1>Loading HomeView</h1>}>
      <HomeView />
    </Suspense>
  ),
  hasErrorBoundary: true,
  path: "/",
};

export default HomeRoute;
