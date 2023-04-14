import { SnakeToCamelCase } from "@hokkyss/composite-types";

type EnvConfig = {
  [Key in keyof ImportMetaEnv as Key extends `VITE_${infer EnvName}`
    ? SnakeToCamelCase<EnvName>
    : never]: ImportMetaEnv[Key];
};

const envConfig: EnvConfig = {
  hello: import.meta.env.VITE_HELLO,
};

export default envConfig;
