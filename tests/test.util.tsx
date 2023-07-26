import { CacheProvider } from "@emotion/react";
import { Except } from "@hokkyss/composite-types";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  Queries,
  RenderHookOptions,
  RenderOptions,
  queries,
  render,
  renderHook,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FC, PropsWithChildren, ReactElement } from "react";
import CssVarsProvider from "~/components/contexts/Theme/Theme.context";
import emotionCache from "~/configs/emotion/emotion.config";
import queryClient from "~/configs/react-query/react-query.config";

const Wrapper: FC<PropsWithChildren> = function Wrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <CssVarsProvider>{children}</CssVarsProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
};

const customRender = <
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
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
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
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
