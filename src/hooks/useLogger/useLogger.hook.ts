// console.* can receive any type of parameters
/* eslint-disable @typescript-eslint/no-explicit-any */

// no-console is disabled because this hook is an abstraction for console.*, and it uses console.* for logging utilities
/* eslint-disable no-console */
import noop from "lodash/noop";
import { useMemo } from "react";

type Logger = Pick<Console, "debug" | "error" | "info" | "log" | "warn">;

export default function useLogger() {
  const log = useMemo(() => (import.meta.env.DEV ? console.log : noop), []);

  const warn = useMemo(() => (import.meta.env.DEV ? console.warn : noop), []);

  const debug = useMemo(() => (import.meta.env.DEV ? console.debug : noop), []);

  const error = useMemo(() => (import.meta.env.DEV ? console.error : noop), []);

  const info = useMemo(() => (import.meta.env.DEV ? console.info : noop), []);

  const logger = useMemo<Logger>(
    () => ({ debug, error, info, log, warn }),
    [debug, error, info, log, warn]
  );

  return logger;
}
