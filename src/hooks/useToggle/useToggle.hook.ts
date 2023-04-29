import { useCallback, useState } from "react";

export default function useToggle(initialValue = false): [boolean, () => void] {
  const [on, setOn] = useState(initialValue);

  const toggle = useCallback(() => setOn((prev) => !prev), []);

  return [on, toggle];
}
