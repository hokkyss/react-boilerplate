import type { Callback } from "../useCallback/useCallback.hook";

import { atom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";

const moduleAtomFamily = atomFamily(
  (param: Callback<() => Promise<{ default: unknown }>>) => atom(param()),
  (a, b) => a === b
);

/**
 * Lazily loads a default exported module. This is compatible with `React.Suspense`.
 * You have to call `stableCallback` globally.
 *
 * @example
 * ```tsx
 * /// component.tsx
 * const lazyIsUndefined = stableCallback(() => import('lodash/isUndefined'));
 *
 * export default function Component() {
 *   const isUndefined = useLazyModule(lazyIsUndefined);
 *
 *   return <>Your Component</>;
 * }
 *
 * /// home.tsx
 * import Component from './component';
 *
 * // will render `Suspense` fallback until the module loads.
 * export default function HomePage() {
 *   return (
 *     <Suspense fallback="Loading Component">
 *       <Component />
 *     </Suspense>
 *   );
 * }
 * ```
 */
export default function useLazyModule<T>(
  importCallback: Callback<() => Promise<{ default: T }>>
) {
  const module = useAtomValue(moduleAtomFamily(importCallback));

  return module.default as T;
}
