// TODO: Remove eslint-disable
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Window {}

declare namespace globalThis {
  declare type ComparablePrimitiveType = number | string | boolean | bigint;

  declare type PrimitiveType =
    | ComparablePrimitiveType
    | undefined
    | symbol
    | null;
}
