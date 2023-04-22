import { useMemo } from "react";
import isEqual from "lodash/isEqual";

type PromiseCache = {
  promise: Promise<void>;
  resp?: any;
  err?: Error;
  args: any[];
};

const caches: PromiseCache[] = [];

const usePromise = <T, Args extends []>(
  promise: (...args: Args) => Promise<T>,
  args: Args
): T => {
  const cache = useMemo(() => {
    const inCache = caches.find((entry) => isEqual(entry.args, args));

    if (inCache) {
      return inCache;
    }

    const willBeCached: PromiseCache = {
      args,
      promise: promise(...args)
        .then((value) => {
          willBeCached.resp = value;
        })
        .catch((reason) => {
          willBeCached.err = reason;
        }),
    };

    caches.push(willBeCached);
    return willBeCached;
  }, [promise, args]);

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
