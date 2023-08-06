import createCache from "@emotion/cache";

import envConfig from "../env/env.config";

const emotionCache = createCache({
  insertionPoint:
    document.getElementById("emotion-insertion-point") ?? undefined,
  key: envConfig.cssPrefix,
});

export default emotionCache;
