import type { NavigateFunction } from "react-router-dom";

import { useEffect, useMemo, useState } from "react";
import {
  useNavigate as useDefaultNavigate,
  useLocation,
} from "react-router-dom";

export type Navigate = [NavigateFunction, boolean];

export default function useNavigate(): Navigate {
  const navigate = useDefaultNavigate();
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);

    return () => {
      setLoaded(false);
    };
  }, [location]);

  const returnValue = useMemo<Navigate>(
    () => [navigate, loaded],
    [navigate, loaded]
  );

  return returnValue;
}
