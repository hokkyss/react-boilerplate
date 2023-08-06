import { atom, useAtomValue, useSetAtom } from "jotai";

import { useColorScheme } from "~/components/contexts/Theme/Theme.context";

const counterAtom = atom(0);
const increaseCounterAtom = atom(null, (get, set) => {
  set(counterAtom, get(counterAtom) + 1);
});
const decreaseCounterAtom = atom(null, (get, set) => {
  set(counterAtom, get(counterAtom) - 1);
});

export default function useHomeViewModel() {
  const colorScheme = useColorScheme();
  const counter = useAtomValue(counterAtom);
  const increaseCounter = useSetAtom(increaseCounterAtom);
  const decreaseCounter = useSetAtom(decreaseCounterAtom);
  // use more hooks, and only use hooks

  return {
    colorScheme,
    counter,
    decreaseCounter,
    increaseCounter,
  };
}
