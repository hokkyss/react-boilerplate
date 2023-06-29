import {
  useCallback as usePrimitiveCallback,
  useMemo as usePrimitiveMemo,
} from "react";
import { renderHook } from "~/utils/test.util";
import useCallback from "../useCallback.hook";

vi.mock("react", async () => {
  const react = await vi.importActual<object>("react");

  return {
    ...react,
    useMemo: vi.fn((val) => val),
    useCallback: vi.fn((val) => val),
  };
});

describe("useCallback", () => {
  it("should be defined", () => {
    expect(useCallback).toBeDefined();
  });

  it("should call primitive useCallback and useMemo", () => {
    const noop = () => undefined;

    renderHook(() => useCallback(noop, []));

    expect(usePrimitiveMemo).toBeCalledTimes(1);
    expect(usePrimitiveCallback).toBeCalledTimes(1);
  });
});
