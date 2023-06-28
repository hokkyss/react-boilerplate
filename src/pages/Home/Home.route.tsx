import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";
import ErrorBoundary from "~/components/templates/ErrorBoundary/ErrorBoundary.template";

const HomeView = lazy(() => import("./Home.view"));

const HomeRoute: RouteObject = {
  path: "/",
  ErrorBoundary,
  element: (
    <Suspense fallback="Loading HomeView">
      <HomeView />
    </Suspense>
  ),
};

export default HomeRoute;
