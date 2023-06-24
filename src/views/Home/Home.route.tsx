import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";

const HomeView = lazy(() => import("./Home.view"));

const HomeRoute: RouteObject = {
  path: "/",
  element: (
    <Suspense fallback="Loading HomeView">
      <HomeView />
    </Suspense>
  ),
};

export default HomeRoute;
