import type { EmptyObject } from "@hokkyss/composite-types";
import { FC, PropsWithChildren } from "react";
import AppRouter from "~/views/Router/Router.view";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary.template";

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
