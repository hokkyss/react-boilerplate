import { Zodios } from "@zodios/core";
import { ZodiosHooks } from "@zodios/react";

import envConfig from "~/configs/env/env.config";

import postsApi from "./endpoints/posts";
import usersApi from "./endpoints/users";

export const zodios = new Zodios(envConfig.apiUrl, [...usersApi, ...postsApi]);

const jsonPlaceholder = new ZodiosHooks("jsonplaceholder", zodios, {
  shouldAbortOnUnmount: true,
});

export default jsonPlaceholder;
