import { makeApi, makeEndpoint, prefixApi } from "@zodios/core";
import { z } from "zod";
import postSchema from "~/schema/Post.schema";
import getPostById from "./:id";

// #region GET POSTS

// #region RESPONSE
export const getPostsResponse = z.array(postSchema);
export type GetPostsResponse = z.infer<typeof getPostsResponse>;
// #endregion RESPONSE

// #region ENDPOINT
const getPosts = makeEndpoint({
  alias: "getPosts",
  method: "get",
  path: "/",
  response: getPostsResponse,
  status: 200,
});
// #endregion ENDPOINT

// #endregion GET POSTS

const postsApi = prefixApi("/posts", makeApi([getPosts, getPostById]));

export default postsApi;
