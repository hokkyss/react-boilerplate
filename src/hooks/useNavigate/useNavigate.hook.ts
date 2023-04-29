import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate as useDefaultNavigate,
} from "react-router-dom";

export default function useNavigate() {
  const navigate = useDefaultNavigate();
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);

    return () => {
      setLoaded(false);
    };
  }, [location]);

  return [navigate, loaded] as const;
}
