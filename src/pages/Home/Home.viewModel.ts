import { useColorScheme } from "~/components/contexts/Theme/Theme.context";

export default function useHomeViewModel() {
  const colorScheme = useColorScheme();
  // use more hooks, and only use hooks

  return { colorScheme };
}
