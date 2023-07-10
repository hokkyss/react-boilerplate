import { generateMock } from "@anatine/zod-mock";
import { rest } from "msw";
import { zodios } from "..";

const mockJsonPlaceholder = zodios.api.map((api) =>
  rest[api.method](`${zodios.baseURL}${api.path}`, (_req, res, ctx) =>
    res(ctx.json(generateMock(api.response)), ctx.status(api.status))
  )
);

export default mockJsonPlaceholder;
