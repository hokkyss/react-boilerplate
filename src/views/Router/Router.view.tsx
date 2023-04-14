import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routerConfig from "~/configs/router/router.config";

const AppRouter: React.FC = function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {routerConfig.map((route) => (
          <Route
            key={route.path}
            caseSensitive
            element={route.element}
            path={route.path}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
