import {
  Queries,
  RenderOptions,
  queries,
  render,
} from "@testing-library/react";
import { ReactElement } from "react";

const customRender = <
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  ui: ReactElement,
  options: Omit<RenderOptions<Q, Container, BaseElement>, "wrapper"> = {}
) =>
  render<Q, Container, BaseElement>(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });

export * from "@testing-library/react";
export { renderHook } from "@testing-library/react-hooks";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
