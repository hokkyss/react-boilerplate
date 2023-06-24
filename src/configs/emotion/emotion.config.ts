import createCache from "@emotion/cache";

const emotionCache = createCache({
  key: "boilerplate",
  insertionPoint:
    document.getElementById("emotion-insertion-point") ?? undefined,
});

export default emotionCache;
