import noop from "lodash/noop";
import { useEffect, useState } from "react";

type Permission =
  | { isFetched: false }
  | { isFetched: true; status: PermissionStatus["state"] };

export default function usePermission(name: PermissionName): Permission {
  const [state, setState] = useState<Permission>({ isFetched: false });
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>();

  useEffect(() => {
    if (!("permissions" in navigator)) {
      return noop;
    }

    navigator.permissions
      .query({
        name,
      })
      .then((status) => {
        setState({ isFetched: true, status: status.state });
        setPermissionStatus(status);
      });

    return noop;
  }, [name]);

  useEffect(() => {
    if (!permissionStatus) {
      return noop;
    }

    const handleChange = () => {
      setState({ isFetched: true, status: permissionStatus.state });
    };

    permissionStatus.addEventListener("change", handleChange);

    return () => {
      permissionStatus.removeEventListener("change", handleChange);
    };
  }, [permissionStatus]);

  return state;
}
