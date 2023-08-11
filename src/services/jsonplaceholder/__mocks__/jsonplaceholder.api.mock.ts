import { generateMock } from "@anatine/zod-mock";
import map from "lodash/map";
import { rest } from "msw";

import { zodios } from "..";

const mockJsonPlaceholder = map(zodios.api, (api, _, self) =>
  rest[api.method](`${zodios.baseURL}${api.path}`, (_req, res, ctx) =>
    res(
      ctx.json(generateMock(api.response, { seed: self.length })),
      ctx.status(api.status)
    )
  )
);

export default mockJsonPlaceholder;
