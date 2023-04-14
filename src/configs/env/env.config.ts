import { SnakeToCamelCase } from "@hokkyss/composite-types";

type EnvConfig = {
  [Key in keyof ImportMetaEnv as Key extends `VITE_${infer EnvName}`
    ? SnakeToCamelCase<EnvName>
    : never]: ImportMetaEnv[Key];
};

const env: EnvConfig = {};

export default env;
