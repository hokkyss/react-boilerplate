import { rest } from "msw";
import { createMock } from "zodock";
import postsApi from "..";

const mockPostsApi = postsApi.map((api) =>
  rest[api.method](api.path, (_req, res, ctx) =>
    res(ctx.json(createMock(api.response)), ctx.status(api.status))
  )
);

export default mockPostsApi;
