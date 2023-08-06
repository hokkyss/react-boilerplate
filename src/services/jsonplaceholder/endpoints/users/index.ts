import {
  makeApi,
  makeEndpoint,
  parametersBuilder,
  prefixApi,
} from "@zodios/core";
import { z } from "zod";
import userSchema from "~/schema/User.schema";
import { type InferParams } from "~/types/endpoint";

// #region GET USERS

// #region PARAMS AND QUERIES
export const getUsersQuery = {
  q: z.string().optional(),
};
export type GetUsersQuery = InferParams<typeof getUsersQuery>;
// #endregion PARAMS AND QUERIES

// #region RESPONSE
export const getUsersResponse = z.array(userSchema);
export type GetUsersResponse = z.infer<typeof getUsersResponse>;
// #endregion RESPONSE

// #region ENDPOINT
const getUsers = makeEndpoint({
  alias: "getUsers",
  method: "get",
  parameters: parametersBuilder().addQueries(getUsersQuery).build(),
  path: "/",
  response: getUsersResponse,
  status: 200,
});
// #endregion ENDPOINT

// #endregion GET USERS

const usersApi = prefixApi("/users", makeApi([getUsers]));

export default usersApi;
