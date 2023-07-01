import { CacheProvider } from "@emotion/react";
import { Except } from "@hokkyss/composite-types";
import {
  Queries,
  RenderHookOptions,
  RenderOptions,
  queries,
  render,
  renderHook,
} from "@testing-library/react";
import { FC, PropsWithChildren, ReactElement } from "react";
import CssVarsProvider from "~/components/contexts/Theme/Theme.context";
import emotionCache from "~/configs/emotion/emotion.config";

const Wrapper: FC<PropsWithChildren> = function Wrapper({ children }) {
  return (
    <CacheProvider value={emotionCache}>
      <CssVarsProvider>{children}</CssVarsProvider>
    </CacheProvider>
  );
};

const customRender = <
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  ui: ReactElement,
  options: Except<RenderOptions<Q, Container, BaseElement>, "wrapper"> = {}
) =>
  render<Q, Container, BaseElement>(ui, {
    wrapper: Wrapper,
    ...options,
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
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render, customRenderHook as renderHook };
