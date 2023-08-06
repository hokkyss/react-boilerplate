// TODO: Remove eslint-disable
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Window {}

declare namespace globalThis {
  declare type ComparablePrimitiveType = bigint | boolean | number | string;

  declare type PrimitiveType =
    | ComparablePrimitiveType
    | null
    | symbol
    | undefined;
}
