import {
  apiBuilder,
  makeApi,
  parametersBuilder,
  prefixApi,
} from "@zodios/core";
import { z } from "zod";
import userSchema from "~/schema/User.schema";

const usersApi = prefixApi(
  "/users",
  makeApi(
    apiBuilder({
      alias: "getUsers",
      method: "get",
      path: "/",
      response: z.array(userSchema),
      parameters: parametersBuilder()
        .addQuery("q", z.string().optional())
        .build(),
    }).build()
  )
);

export default usersApi;
