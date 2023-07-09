import { makeEndpoint, parametersBuilder } from "@zodios/core";
import { z } from "zod";
import postSchema from "~/schema/Post.schema";
import { InferParams } from "~/types/endpoint";

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
  path: "/:id",
  method: "get",
  response: getPostByIdResponse,
  parameters: parametersBuilder().addPaths(getPostByIdParams).build(),
  status: 200,
});
// #endregion ENDPOINT

export default getPostById;
