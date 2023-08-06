import type { InferParams } from "~/types/endpoint";

import { makeEndpoint, parametersBuilder } from "@zodios/core";
import { z } from "zod";

import postSchema from "~/schema/Post.schema";

// #region PARAMS AND QUERIES
export const getPostByIdParams = {
  id: z.number(),
};
export type GetPostByIdParams = InferParams<typeof getPostByIdParams>;
// #endregion PARAMS AND QUERIES

// #region RESPONSE
export const getPostByIdResponse = postSchema;
export type GetPostByIdResponse = z.infer<typeof getPostByIdResponse>;
// #endregion RESPONSE

// #region ENDPOINT
const getPostById = makeEndpoint({
  alias: "getPostById",
  method: "get",
  parameters: parametersBuilder().addPaths(getPostByIdParams).build(),
  path: "/:id",
  response: getPostByIdResponse,
  status: 200,
});
// #endregion ENDPOINT

export default getPostById;
