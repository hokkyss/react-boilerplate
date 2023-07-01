import {
  useCallback as usePrimitiveCallback,
  useMemo as usePrimitiveMemo,
} from "react";
import { renderHook } from "~/utils/test.util";
import useCallback from "../useCallback.hook";

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
