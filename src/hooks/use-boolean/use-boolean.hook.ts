import type { Callback } from "../use-callback/use-callback.hook";

import { useMemo, useState } from "react";

import useCallback from "../use-callback/use-callback.hook";

export type UseBooleanReturn = [
  boolean,
  {
    close: Callback<() => void>;
    open: Callback<() => void>;
    toggle: Callback<() => void>;
  }
];

export default function useBoolean(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => setIsOpen(false), []);

  return useMemo<UseBooleanReturn>(
    () => [isOpen, { close, open, toggle }],
    [close, isOpen, open, toggle]
  );
}
