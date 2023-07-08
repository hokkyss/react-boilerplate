import { Zodios } from "@zodios/core";
import { ZodiosHooks } from "@zodios/react";
import envConfig from "~/configs/env/env.config";
import usersApi from "./endpoints/users.api";

export const zodios = new Zodios(envConfig.apiUrl, [...usersApi]);

const jsonplaceholderApi = new ZodiosHooks("jsonplaceholder", zodios, {
  shouldAbortOnUnmount: true,
});

export default jsonplaceholderApi;
