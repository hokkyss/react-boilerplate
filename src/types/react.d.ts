/// <reference types="react" />

type UseCallback<T> = T;

declare namespace React {
  function useCallback<T extends (...args: unknown[]) => unknown>(
    callback: T,
    deps: DependencyList
  ): UseCallback<T>;
}
