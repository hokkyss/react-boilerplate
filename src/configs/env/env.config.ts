import { type SnakeToCamelCase } from "@hokkyss/composite-types";

type EnvConfig = {
  [Key in keyof ImportMetaEnv as Key extends `VITE_${infer EnvName}`
    ? SnakeToCamelCase<EnvName>
    : never]: ImportMetaEnv[Key];
};

const envConfig: EnvConfig = {
  get apiUrl() {
    return import.meta.env.VITE_API_URL;
  },
  get cssPrefix() {
    return import.meta.env.VITE_CSS_PREFIX;
  },
  get identifierPrefix() {
    return import.meta.env.VITE_IDENTIFIER_PREFIX;
  },
};

export default envConfig;
