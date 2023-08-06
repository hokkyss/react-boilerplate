import { atom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import type { Callback } from "../useCallback/useCallback.hook";

const moduleAtomFamily = atomFamily(
  (param: Callback<() => Promise<{ default: unknown }>>) => atom(param()),
  (a, b) => a === b
);

export default function useLazyModule<T>(
  importCallback: Callback<() => Promise<{ default: T }>>
) {
  const module = useAtomValue(moduleAtomFamily(importCallback));

  return module.default as T;
}
