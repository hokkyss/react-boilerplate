import { useMemo, useState } from "react";

import type { Callback } from "../useCallback/useCallback.hook";

import useCallback from "../useCallback/useCallback.hook";

export type Toggle = [
  boolean,
  {
    close: Callback<() => void>;
    open: Callback<() => void>;
    toggle: Callback<() => void>;
  }
];

export default function useToggle(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => setIsOpen(false), []);

  const returnValue = useMemo<Toggle>(
    () => [isOpen, { close, open, toggle }],
    [close, isOpen, open, toggle]
  );

  return returnValue;
}
