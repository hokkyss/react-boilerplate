import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";
import ErrorBoundary from "~/components/templates/ErrorBoundary/ErrorBoundary.template";

const HomeView = lazy(() => import("./Home.view"));

const HomeRoute: RouteObject = {
  ErrorBoundary,
  element: (
    <Suspense fallback="Loading HomeView">
      <HomeView />
    </Suspense>
  ),
  hasErrorBoundary: true,
  path: "/",
};

export default HomeRoute;
