import type { PropsWithChildren } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { LazyMotion } from "framer-motion";
import { memo } from "react";

import queryClient from "~/configs/react-query/react-query.config";

const framerMotion = () =>
  import("~/configs/framer-motion/framer-motion.config").then(
    (mod) => mod.default
  );

const AppContext = memo<PropsWithChildren>((props) => {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={framerMotion} strict>
        {children}
      </LazyMotion>
    </QueryClientProvider>
  );
});

AppContext.displayName = "AppContext";

export default AppContext;
