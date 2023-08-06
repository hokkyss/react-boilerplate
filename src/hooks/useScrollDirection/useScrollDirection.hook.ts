import { useEffect, useState } from "react";
import usePrevious from "../usePrevious/usePrevious.hook";

export type ScrollDirection = "down" | "none" | "up";

export default function useScrollDirection(minimumOffset = 1): ScrollDirection {
  const [scrollTop, setScrollTop] = useState(0);
  const previous = usePrevious(scrollTop);

  useEffect(() => {
    setScrollTop(window.scrollY);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollTop(window.scrollY);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (Math.abs(previous - scrollTop) < minimumOffset) {
    return "none";
  }

  return scrollTop > previous ? "down" : "up";
}
