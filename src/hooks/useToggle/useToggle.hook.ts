import { useMemo, useState } from "react";
import useCallback, { Callback } from "../useCallback/useCallback.hook";

export type Toggle = [
  boolean,
  {
    toggle: Callback<() => void>;
    open: Callback<() => void>;
    close: Callback<() => void>;
  }
];

export default function useToggle(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => setIsOpen(false), []);

  const returnValue = useMemo<Toggle>(
    () => [isOpen, { toggle, open, close }],
    [close, isOpen, open, toggle]
  );

  return returnValue;
}
