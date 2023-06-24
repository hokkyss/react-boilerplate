import { useState } from "react";
import useCallback from "../useCallback/useCallback.hook";

export default function useToggle(initialValue = false): [boolean, () => void] {
  const [on, setOn] = useState(initialValue);

  const toggle = useCallback(() => setOn((prev) => !prev), []);

  return [on, toggle];
}
