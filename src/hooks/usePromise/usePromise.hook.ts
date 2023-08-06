import find from "lodash/find";
import findIndex from "lodash/findIndex";
import isEqual from "lodash/isEqual";
import { useEffect, useMemo } from "react";

type PromiseCache = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  args: any[];
  /* eslint-enable @typescript-eslint/no-explicit-any */
  err?: Error;
  key: string;
  promise: Promise<void>;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  resp?: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
};

const caches: PromiseCache[] = [];

export const invalidatePromise = (key: string) => {
  const index = findIndex(caches, (entry) => entry.key === key);

  if (index === -1) return;
  caches.splice(index, 1);
};

const usePromise = <T, Args extends []>(
  promiseFunc: (...args: Args) => Promise<T>,
  key = promiseFunc.toString(),
  ...args: Args
): T => {
  const cache = useMemo(() => {
    const inCache = find(
      caches,
      (entry) => isEqual(entry.args, args) && isEqual(entry.key, key)
    );

    if (inCache) {
      return inCache;
    }

    const willBeCached: PromiseCache = {
      args,
      key,
      promise: promiseFunc(...args)
        .then((value) => {
          willBeCached.resp = value;
        })
        .catch((reason) => {
          willBeCached.err = reason;
        }),
    };

    caches.push(willBeCached);
    return willBeCached;
  }, [promiseFunc, args, key]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      invalidatePromise(cache.key);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [cache]);

  if (cache?.resp) {
    return cache.resp;
  }
  if (cache?.err) {
    throw cache.err;
  }

  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw cache.promise;
};

export default usePromise;
