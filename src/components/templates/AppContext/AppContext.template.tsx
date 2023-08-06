import { CacheProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { LazyMotion } from "framer-motion";
import { memo, type PropsWithChildren } from "react";
import CssVarsProvider from "~/components/contexts/Theme/Theme.context";
import emotionCache from "~/configs/emotion/emotion.config";
import queryClient from "~/configs/react-query/react-query.config";

const framerMotion = () =>
  import("~/configs/framer-motion/framer-motion.config").then(
    (mod) => mod.default
  );

const AppContext = memo<PropsWithChildren>((props) => {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <CssVarsProvider>
          <LazyMotion features={framerMotion} strict>
            {children}
          </LazyMotion>
        </CssVarsProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
});

AppContext.displayName = "AppContext";

export default AppContext;
