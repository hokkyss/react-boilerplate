import React from "react";
import { RouteObject } from "react-router-dom";
import App from "./Home.view";

const HomeRoute: RouteObject = {
  path: "/",
  element: <App />,
};

export default HomeRoute;
