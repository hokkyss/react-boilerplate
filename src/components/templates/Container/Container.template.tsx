import React, { FC, PropsWithChildren } from "react";
import type { EmptyObject } from "@hokkyss/composite-types";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary.template";
import AppRouter from "~/views/Router/Router.view";

type ContainerTemplateProps = PropsWithChildren<EmptyObject>;

const ContainerTemplate: FC<ContainerTemplateProps> =
  function ContainerTemplate() {
    return (
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    );
  };

export default ContainerTemplate;
