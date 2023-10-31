import type {
  Queries,
  RenderHookOptions,
  RenderOptions,
  queries,
} from "@testing-library/react";
import type { FC, PropsWithChildren, ReactElement } from "react";

import type { Except } from "~/utils/types.util";

import { QueryClientProvider } from "@tanstack/react-query";
import { render, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import queryClient from "~/configs/react-query/react-query.config";

const Wrapper: FC<PropsWithChildren> = function Wrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = <
  Q extends Queries = typeof queries,
  Container extends DocumentFragment | Element = HTMLElement,
  BaseElement extends DocumentFragment | Element = Container
>(
  ui: ReactElement,
  options: Except<RenderOptions<Q, Container, BaseElement>, "wrapper"> = {}
) => ({
  user: userEvent.setup(),
  ...render<Q, Container, BaseElement>(ui, {
    wrapper: Wrapper,
    ...options,
  }),
});

const customRenderHook = <
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends DocumentFragment | Element = HTMLElement,
  BaseElement extends DocumentFragment | Element = Container
>(
  renderFunc: (initialProps: Props) => Result,
  options?: Except<
    RenderHookOptions<Props, Q, Container, BaseElement>,
    "wrapper"
  >
) =>
  renderHook<Result, Props, Q, Container, BaseElement>(renderFunc, {
    wrapper: Wrapper,
    ...options,
  });

export * from "@testing-library/react";
export { userEvent };
// override render export
export { customRender as render, customRenderHook as renderHook };
