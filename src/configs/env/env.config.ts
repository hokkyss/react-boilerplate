import type { SnakeToCamelCase } from "~/utils/types.util";

type EnvConfig = {
  [Key in keyof ImportMetaEnv as Key extends `VITE_${infer EnvName}`
    ? SnakeToCamelCase<EnvName>
    : never]: ImportMetaEnv[Key];
};

const envConfig: EnvConfig = {
  get apiUrl() {
    return import.meta.env.VITE_API_URL;
  },
  get identifierPrefix() {
    return import.meta.env.VITE_IDENTIFIER_PREFIX;
  },
};

export default envConfig;
