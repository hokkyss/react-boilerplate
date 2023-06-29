import createCache from "@emotion/cache";
import envConfig from "../env/env.config";

const emotionCache = createCache({
  key: envConfig.cssPrefix,
  insertionPoint:
    document.getElementById("emotion-insertion-point") ?? undefined,
});

export default emotionCache;
