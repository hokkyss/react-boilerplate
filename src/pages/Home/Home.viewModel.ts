import { useColorScheme } from "~/components/contexts/Theme/Theme.context";
import jsonplaceholderApi from "~/services/api/jsonplaceholder";

export default function useHomeViewModel() {
  const users = jsonplaceholderApi.useGetUsers();
  const colorScheme = useColorScheme();
  // use more hooks, and only use hooks

  return { users, colorScheme };
}
