import { SnakeToCamelCase } from "@hokkyss/composite-types";

type EnvConfig = {
  [Key in keyof ImportMetaEnv as Key extends `VITE_${infer EnvName}`
    ? SnakeToCamelCase<EnvName>
    : never]: ImportMetaEnv[Key];
};

const envConfig: EnvConfig = {
  get hello() {
    return import.meta.env.VITE_HELLO;
  },
  get cssPrefix() {
    return import.meta.env.VITE_CSS_PREFIX;
  },
};

export default envConfig;
