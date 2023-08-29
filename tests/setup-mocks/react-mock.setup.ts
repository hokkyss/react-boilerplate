import type { LinkProps } from "react-router-dom";

import { createElement } from "react";

vi.mock("react-dom", async (importOriginal) => {
  const ReactDOM = await importOriginal<object>();

  return {
    ...ReactDOM,
    createPortal: vi.fn((element, _) => element),
  };
});

vi.mock("react", async (importOriginal) => {
  const react = await importOriginal<object>();

  return {
    ...react,
    useCallback: vi.fn((val) => val),
    useMemo: vi.fn((val) => val()),
  };
});

vi.mock("react-router-dom", async (importOriginal) => {
  const reactRouter = await importOriginal<object>();

  return {
    ...reactRouter,
    Link: ({
      className,
      preventScrollReset: _preventScrollReset,
      relative: _relative,
      reloadDocument: _reloadDocument,
      replace: _replace,
      state: _state,
      to,
      ...props
    }: LinkProps) =>
      createElement("a", {
        className: ["react-router-dom-link", className].join(" "),
        href: to.toString(),
        ...props,
      }),
  };
});

afterEach(() => {
  vi.restoreAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
});
